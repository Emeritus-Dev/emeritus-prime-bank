import logging
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.audit import AuditLog

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("EmeritusSecurity")

def dispatch_silent_emergency_alert(user_id: int, db: Session, client_ip: str = "127.0.0.1"):
    """
    Silently logs and dispatches an emergency panic signal to the Fraud Desk.
    Produces ZERO UI response or visible error payloads to the client.
    """
    timestamp = datetime.now(timezone.utc)

    # 1. Save event to silent audit log
    audit_entry = AuditLog(
        user_id=user_id,
        event_type="DURESS_LOGIN_ALERT",
        details=f"Silent duress triggered from IP {client_ip} at {timestamp.isoformat()}"
    )
    db.add(audit_entry)
    db.commit()

    # 2. Log internal security dispatch
    logger.warning(
        f"🚨 [SECURITY DISPATCH] Silent Emergency Alert for User ID #{user_id}. "
        f"Coercion protocol engaged. IP: {client_ip}"
    )
    return True