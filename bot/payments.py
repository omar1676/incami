import requests
from config import USDT_WALLET, TRONGRID_API_KEY

TRONGRID_URL = "https://api.trongrid.io"

def verify_usdt_payment(tx_hash: str, expected_amount_eur: float) -> dict:
    """
    Verifica una transacción USDT TRC20 en TronGrid.
    Retorna {"ok": True/False, "amount": X, "to": "..."}
    """
    try:
        headers = {"TRON-PRO-API-KEY": TRONGRID_API_KEY} if TRONGRID_API_KEY else {}
        url = f"{TRONGRID_URL}/v1/transactions/{tx_hash}"
        resp = requests.get(url, headers=headers, timeout=10)

        if resp.status_code != 200:
            return {"ok": False, "error": "TX no encontrada"}

        data = resp.json()

        # Verificar que es una transferencia USDT TRC20
        # Contract USDT TRC20: TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
        USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"

        if not data.get("data"):
            return {"ok": False, "error": "TX vacía"}

        tx = data["data"][0] if isinstance(data.get("data"), list) else data

        # Extraer datos del contrato
        raw_data = tx.get("raw_data", {})
        contract = raw_data.get("contract", [{}])[0]
        contract_type = contract.get("type", "")

        if contract_type != "TriggerSmartContract":
            return {"ok": False, "error": "No es una TX de token"}

        # Extraer destinatario y cantidad del input del contrato
        # USDT TRC20 amount tiene 6 decimales
        param = contract.get("parameter", {}).get("value", {})
        contract_address = param.get("contract_address", "")

        if contract_address != USDT_CONTRACT:
            return {"ok": False, "error": "No es USDT TRC20"}

        # Verificar que la TX fue exitosa
        ret = tx.get("ret", [{}])
        if ret and ret[0].get("contractRet") != "SUCCESS":
            return {"ok": False, "error": "TX fallida"}

        # Decodificar importe real de la transacción (ABI TRC20 transfer)
        contract_data = param.get("data", "")
        if len(contract_data) >= 136:
            amount_hex  = contract_data[72:136]
            amount_raw  = int(amount_hex, 16)
            usdt_amount = amount_raw / 1_000_000  # USDT tiene 6 decimales

            min_expected = expected_amount_eur * 0.95  # tolerancia 5%
            if usdt_amount < min_expected:
                return {
                    "ok": False,
                    "error": f"Importe insuficiente: {usdt_amount:.2f} USDT (esperado: {expected_amount_eur:.2f})"
                }
            return {"ok": True, "amount": usdt_amount}
        else:
            return {"ok": False, "error": "No se pudo leer el importe de la TX"}

    except Exception as e:
        return {"ok": False, "error": str(e)}


def payment_instructions_text(total: float, order_id: str, wallet: str) -> str:
    return (
        f"💳 *Instrucciones de pago*\n\n"
        f"Envía exactamente *{total} USDT* (red TRC20) a:\n\n"
        f"`{wallet}`\n\n"
        f"⚠️ *Importante:*\n"
        f"• Usa solo la red *TRC20* (Tron)\n"
        f"• Envía exactamente {total} USDT\n"
        f"• 1 USDT = 1€\n\n"
        f"Una vez pagado, envíame el *hash de la transacción* "
        f"(lo encuentras en tu wallet después de enviar).\n\n"
        f"📋 Tu número de pedido: `#{order_id}`"
    )
