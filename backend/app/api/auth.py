from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.security import create_access_token, verify_pin
from app.database import get_db
from app.models.account import AuditLog, User
from app.schemas import LoginRequest, TokenResponse

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == "client_prime").first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not initialized"
        )

    is_standard = verify_pin(request.pin, user.standard_pin_hash)
    is_duress = verify_pin(request.pin, user.duress_pin_hash)

    if not is_standard and not is_duress:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid security credentials.",
        )

    # Coercion / Duress Event Logging
    if is_duress:
        audit = AuditLog(
            user_id=user.id,
            event_type="DURESS_LOGIN",
            description="Duress passcode entered. Interception protocol activated.",
            is_duress_flagged=True,
        )
        db.add(audit)
        db.commit()
        print(f"🚨 [SECURITY DISPATCH] Silent Emergency Alert for User ID #{user.id}. Coercion protocol engaged.")

    token = create_access_token(subject=user.id, is_duress=is_duress)

    return TokenResponse(
        access_token=token,
        customer_name=user.full_name,
        initials=user.initials,
        is_duress=is_duress,
    )