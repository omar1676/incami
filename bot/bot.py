import json
import base64
import logging
from telegram import Update, ReplyKeyboardRemove
from telegram.ext import (
    Application, CommandHandler, MessageHandler,
    ConversationHandler, ContextTypes, filters,
)
from config import BOT_TOKEN, SUPPLIER_CHAT_ID, USDT_WALLET, OWNER_CHAT_ID
from products import get_product, get_product_by_index, calculate_item_price, calculate_total
from database import init_db, create_order, get_order, get_order_by_user, update_order
from payments import verify_usdt_payment, payment_instructions_text

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Estados de la conversación
WAITING_EXTRAS, WAITING_ADDRESS, WAITING_PAYMENT = range(3)


# ── Helpers ─────────────────────────────────────────────────────────────────

def decode_order_payload(encoded: str) -> list | None:
    if not encoded:
        return None

    # Formato compacto v2: empieza con 'p' + grupos de 5 chars (II S Q e)
    if encoded.startswith('p'):
        try:
            body = encoded[1:]
            if len(body) % 5 != 0:
                return None
            size_dec = {'S':'S','M':'M','L':'L','X':'XL','2':'2XL','3':'3XL','4':'4XL'}
            items = []
            for i in range(0, len(body), 5):
                chunk = body[i:i+5]
                idx       = int(chunk[:2])
                size      = size_dec.get(chunk[2], chunk[2])
                qty       = int(chunk[3])
                extras_bits = int(chunk[4])
                pid, product = get_product_by_index(idx)
                if not product:
                    return None
                extras = {
                    'parche': bool(extras_bits & 1),
                    'numero': '' if extras_bits & 2 else None,
                    'nombre': '' if extras_bits & 4 else None,
                }
                items.append({'id': pid, 'size': size, 'qty': qty, 'extras': extras})
            return items or None
        except Exception:
            return None

    # Fallback: formato base64 antiguo
    try:
        padded = encoded + "=" * (4 - len(encoded) % 4)
        decoded = base64.urlsafe_b64decode(padded).decode()
        return json.loads(decoded)
    except Exception:
        return None

def format_items(items: list) -> str:
    lines = []
    for item in items:
        product = get_product(item["id"])
        if not product:
            continue
        unit = calculate_item_price(item["id"], item.get("extras"))
        subtotal = unit * item.get("qty", 1)
        line = f"• {product['name']}\n  Talla: {item['size']} · x{item['qty']} · {unit}€/ud = {subtotal}€"
        extras = item.get("extras", {})
        extras_list = []
        if extras.get("parche"):                extras_list.append("Parche (+5€)")
        if extras.get("numero"):               extras_list.append(f"Número: {extras['numero']} (+5€)")
        if extras.get("nombre"):               extras_list.append(f"Nombre: {extras['nombre']} (+5€)")
        if extras_list:
            line += f"\n  Extras: {', '.join(extras_list)}"
        lines.append(line)
    return "\n\n".join(lines)

def format_supplier_message(order: dict) -> str:
    items = json.loads(order["items_json"])
    lines = []
    for item in items:
        product = get_product(item["id"])
        if not product:
            continue
        line = f"• {product['name']} | Talla {item['size']} | x{item['qty']}"
        extras = item.get("extras", {})
        if extras.get("parche"):  line += " | Parche"
        if extras.get("numero"): line += f" | Número: {extras['numero']}"
        if extras.get("nombre"): line += f" | Nombre: {extras['nombre']}"
        lines.append(line)

    extras_block = f"\n✏️ *Personalización:*\n{order['extras_text']}\n" if order.get('extras_text') else ""
    return (
        f"🆕 *NUEVO PEDIDO #{order['id']}*\n\n"
        f"📦 *Productos:*\n" + "\n".join(lines) + "\n"
        + extras_block +
        f"\n📍 *Dirección de envío:*\n{order['address']}\n\n"
        f"👤 *Cliente:* @{order['username'] or 'sin usuario'}\n"
        f"💰 *Total cobrado:* {order['total']} USDT\n"
        f"🔗 *TX:* `{order['tx_hash']}`"
    )


# ── Handlers ─────────────────────────────────────────────────────────────────

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    args = context.args

    if not args:
        await update.message.reply_text(
            "👋 Bienvenido a *INCAMI*\n\nVisita nuestra web para ver el catálogo y hacer tu pedido.",
            parse_mode="Markdown"
        )
        return ConversationHandler.END

    # Decodificar pedido del payload
    logging.info(f"START payload recibido: {args[0]!r}")
    items = decode_order_payload(args[0])
    logging.info(f"Items decodificados: {items}")
    if not items:
        await update.message.reply_text("❌ Pedido no válido. Vuelve a la web e inténtalo de nuevo.")
        return ConversationHandler.END

    total_units = sum(i.get('qty', 1) for i in items)
    if total_units < 8:
        await update.message.reply_text(
            f"⚠️ El pedido mínimo es de *8 prendas*.\n\n"
            f"Tu pedido tiene {total_units} prenda(s). Vuelve a la tienda y añade más artículos.",
            parse_mode="Markdown"
        )
        return ConversationHandler.END

    total = calculate_total(items)
    user = update.effective_user

    # Guardar pedido en DB
    order_id = create_order(user.id, user.username, items, total)

    # Guardar en contexto para los próximos pasos
    context.user_data["order_id"] = order_id
    context.user_data["items"]    = items
    context.user_data["total"]    = total

    summary = format_items(items)

    # Comprobar si algún item necesita número o nombre personalizados
    needs_extras = any(
        i.get('extras', {}).get('numero') is not None or
        i.get('extras', {}).get('nombre') is not None
        for i in items
    )

    if needs_extras:
        # Construir lista de items que necesitan personalización
        extra_lines = []
        for item in items:
            ex = item.get('extras', {})
            fields = []
            if ex.get('numero') is not None: fields.append('Número')
            if ex.get('nombre') is not None: fields.append('Nombre')
            if fields:
                product = get_product(item['id'])
                extra_lines.append(f"• {product['name']} ({', '.join(fields)})")

        await update.message.reply_text(
            f"✅ *Pedido recibido — #{order_id}*\n\n"
            f"{summary}\n\n"
            f"✏️ *Personalización requerida:*\n" + "\n".join(extra_lines) + "\n\n"
            f"Envía los datos en este formato, uno por línea:\n"
            f"`Nombre del equipo: Número X / Nombre Apellido`\n\n"
            f"Ejemplo:\n`Argentina Visitante: Número 10 / Nombre Messi`",
            parse_mode="Markdown"
        )
        return WAITING_EXTRAS

    await update.message.reply_text(
        f"✅ *Pedido recibido — #{order_id}*\n\n"
        f"{summary}\n\n"
        f"📍 Para continuar, envíame tu *dirección completa de envío*:\n"
        f"_(Nombre · Calle · Ciudad · País · Código Postal)_",
        parse_mode="Markdown"
    )
    return WAITING_ADDRESS


async def receive_extras(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    extras_text = update.message.text.strip()
    order_id    = context.user_data.get("order_id")

    if not order_id:
        await update.message.reply_text("❌ Sesión expirada. Vuelve a la web para hacer el pedido.")
        return ConversationHandler.END

    update_order(order_id, extras_text=extras_text)

    await update.message.reply_text(
        f"✅ Personalización guardada.\n\n"
        f"📍 Ahora envíame tu *dirección completa de envío*:\n"
        f"_(Nombre · Calle · Ciudad · País · Código Postal)_",
        parse_mode="Markdown"
    )
    return WAITING_ADDRESS


async def receive_address(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    address  = update.message.text.strip()
    order_id = context.user_data.get("order_id")
    total    = context.user_data.get("total")

    if not order_id:
        await update.message.reply_text("❌ Sesión expirada. Vuelve a la web para hacer el pedido.")
        return ConversationHandler.END

    # Guardar dirección
    update_order(order_id, address=address, status="pending_payment")

    # Enviar instrucciones de pago
    instructions = payment_instructions_text(total, order_id, USDT_WALLET)
    await update.message.reply_text(instructions, parse_mode="Markdown")
    await update.message.reply_text(
        "Cuando hayas enviado el pago, escríbeme el *hash de la transacción* aquí.",
        parse_mode="Markdown"
    )
    return WAITING_PAYMENT


async def receive_payment(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    tx_hash  = update.message.text.strip()
    order_id = context.user_data.get("order_id")
    total    = context.user_data.get("total")

    if not order_id:
        await update.message.reply_text("❌ Sesión expirada.")
        return ConversationHandler.END

    await update.message.reply_text("🔍 Verificando pago en la blockchain... un momento.")

    result = verify_usdt_payment(tx_hash, total)

    if not result["ok"]:
        await update.message.reply_text(
            f"❌ No se pudo verificar el pago: {result.get('error', 'error desconocido')}\n\n"
            f"Comprueba que:\n"
            f"• El hash es correcto\n"
            f"• Usaste la red TRC20\n"
            f"• La transacción ya está confirmada (puede tardar 1-2 min)\n\n"
            f"Inténtalo de nuevo enviando el hash."
        )
        return WAITING_PAYMENT

    # Pago verificado → actualizar pedido
    update_order(order_id, tx_hash=tx_hash, status="paid")

    # Notificar al cliente
    await update.message.reply_text(
        f"✅ *¡Pago confirmado!*\n\n"
        f"Tu pedido *#{order_id}* ha sido recibido y está siendo procesado.\n\n"
        f"Te avisaremos cuando sea enviado con el número de seguimiento. ⏱ Plazo estimado: 7-14 días.",
        parse_mode="Markdown"
    )

    # Reenviar al proveedor chino
    order = get_order(order_id)
    supplier_msg = format_supplier_message(order)

    if SUPPLIER_CHAT_ID:
        try:
            await context.bot.send_message(
                chat_id=int(SUPPLIER_CHAT_ID),
                text=supplier_msg,
                parse_mode="Markdown"
            )
        except Exception as e:
            logging.error(f"Error enviando al proveedor: {e}")

    # Notificarte a ti también
    if OWNER_CHAT_ID:
        try:
            await context.bot.send_message(
                chat_id=int(OWNER_CHAT_ID),
                text=f"💰 *NUEVO PEDIDO PAGADO #{order_id}*\nTotal: {total}€\n\n{supplier_msg}",
                parse_mode="Markdown"
            )
        except Exception as e:
            logging.error(f"Error notificando al owner: {e}")

    return ConversationHandler.END


async def solo_web(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "⚠️ Los pedidos solo se realizan desde nuestra tienda web.\n\n"
        "🌐 Visita nuestra tienda, añade las camisetas al carrito y pulsa el botón de Telegram para hacer tu pedido.",
        parse_mode="Markdown"
    )

async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text("Pedido cancelado.", reply_markup=ReplyKeyboardRemove())
    return ConversationHandler.END


async def estado(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Comando /estado para consultar el estado del último pedido."""
    user_id = update.effective_user.id
    order = get_order_by_user(user_id)

    if not order:
        await update.message.reply_text("No tienes pedidos recientes.")
        return

    status_labels = {
        "pending_address": "⏳ Pendiente de dirección",
        "pending_payment": "💳 Esperando pago",
        "paid":            "✅ Pagado — en proceso",
        "shipped":         "🚚 Enviado",
        "delivered":       "📦 Entregado",
    }
    label = status_labels.get(order["status"], order["status"])

    await update.message.reply_text(
        f"📋 *Pedido #{order['id']}*\n"
        f"Estado: {label}\n"
        f"Total: {order['total']}€\n"
        f"Fecha: {order['created_at'][:10]}",
        parse_mode="Markdown"
    )


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    init_db()

    app = Application.builder().token(BOT_TOKEN).build()

    conv = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            WAITING_EXTRAS:  [MessageHandler(filters.TEXT & ~filters.COMMAND, receive_extras)],
            WAITING_ADDRESS: [MessageHandler(filters.TEXT & ~filters.COMMAND, receive_address)],
            WAITING_PAYMENT: [MessageHandler(filters.TEXT & ~filters.COMMAND, receive_payment)],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
        allow_reentry=True,
    )

    app.add_handler(conv)
    app.add_handler(CommandHandler("estado", estado))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, solo_web))

    logging.info("Bot INCAMI arrancando...")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
