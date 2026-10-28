import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.accounts import get_current_session
from app.database import get_db
from app.models.account import Account, AuditLog
from app.schemas import TransferRequest, TransferResponse

router = APIRouter()


@router.post("", response_model=TransferResponse)
def execute_transfer(
        payload: TransferRequest,
        session: dict = Depends(get_current_session),
        db: Session = Depends(get_db),
):
    user = session["user"]
    is_duress = session["is_duress"]

    account = (
        db.query(Account)
        .filter(
            Account.id == payload.source_account_id,
            Account.user_id == user.id,
            Account.is_decoy == is_duress,
            )
        .first()
    )

    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Source account not found"
        )

    if account.balance < payload.amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient funds"
        )

    # Deduct balance
    account.balance -= payload.amount
    tx_id = f"TX-{uuid.uuid4().hex[:8].upper()}"

    if is_duress:
        # Decoy transfer simulation: funds are deducted in the decoy UI, but flagged silently
        audit = AuditLog(
            user_id=user.id,
            event_type="COERCED_TRANSFER",
            description=f"Decoy transfer of R{payload.amount:.2f} executed to {payload.destination_account_number}. Flagged silently.",
            is_duress_flagged=True,
        )
        db.add(audit)
        print(f"🚨 [DURESS LOG] Coerced outbound wire recorded: TX ID {tx_id}")

    db.commit()
    db.refresh(account)

    return TransferResponse(
        success=True,
        message="Transfer processed successfully.",
        transaction_id=tx_id,
        remaining_balance=account.balance,
    )