import sqlite3
import uuid
from datetime import datetime

DB_PATH = "orders.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id          TEXT PRIMARY KEY,
            user_id     INTEGER NOT NULL,
            username    TEXT,
            items_json  TEXT NOT NULL,
            address     TEXT,
            total       REAL NOT NULL,
            status      TEXT DEFAULT 'pending_address',
            tx_hash     TEXT,
            created_at  TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def create_order(user_id, username, items, total):
    order_id = str(uuid.uuid4())[:8].upper()
    conn = sqlite3.connect(DB_PATH)
    import json
    conn.execute(
        "INSERT INTO orders (id, user_id, username, items_json, total) VALUES (?,?,?,?,?)",
        (order_id, user_id, username, json.dumps(items), total)
    )
    conn.commit()
    conn.close()
    return order_id

def get_order(order_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    row = conn.execute("SELECT * FROM orders WHERE id=?", (order_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def get_order_by_user(user_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    row = conn.execute(
        "SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 1",
        (user_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None

def update_order(order_id, **kwargs):
    conn = sqlite3.connect(DB_PATH)
    fields = ", ".join(f"{k}=?" for k in kwargs)
    values = list(kwargs.values()) + [order_id]
    conn.execute(f"UPDATE orders SET {fields} WHERE id=?", values)
    conn.commit()
    conn.close()
