import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN       = os.getenv("BOT_TOKEN", "")           # Token de @BotFather
SUPPLIER_CHAT_ID = os.getenv("SUPPLIER_CHAT_ID", "")   # Chat ID del proveedor chino
USDT_WALLET     = os.getenv("USDT_WALLET", "")         # Tu wallet USDT TRC20
TRONGRID_API_KEY = os.getenv("TRONGRID_API_KEY", "")   # API key de trongrid.io (gratis)
OWNER_CHAT_ID   = os.getenv("OWNER_CHAT_ID", "")       # Tu propio chat ID (para alertas)
