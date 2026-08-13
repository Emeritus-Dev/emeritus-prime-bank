import random
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from app.core.security import decode_access_token
from app.schemas import TransferRequest, TransferResponse
from app.models.audit import AuditLog

router = APIRouter(prefix="/transfers", tags=["Transfers"])

def get_token_payload(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token header format")
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

@router.post("", response_model=TransferResponse)
def execute_transfer(
        transfer: TransferRequest,
        payload: dict = Depends(get_token_payload),
        db: Session = Depends(get_db)
):
    is_duress = payload.get("is_duress", False)
    ref_num = f"TXN-{random.randint(100000, 999999)}"

    if is_duress:
        audit = AuditLog(
            user_id=int(payload.get("sub", 1)),
            event_type="COERCED_TRANSFER_ATTEMPT",
            details=f"Coerced transfer of R{transfer.amount} from {transfer.fromId} to {transfer.toId}"
        )
        db.add(audit)
        db.commit()

        return TransferResponse(
            status="completed",
            reference=ref_num,
            message="Transfer processed successfully"
        )

    return TransferResponse(
        status="completed",
        reference=ref_num,
        message="Transfer executed successfully"
    )