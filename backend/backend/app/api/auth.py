from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from database import get_db
from app.models.user import User
from app.core.security import verify_pin, create_access_token
from app.services.duress import dispatch_silent_emergency_alert
from app.schemas import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == 1).first()
    if not user:
        raise HTTPException(status_code=404, detail="Default demo user not found")

    client_ip = request.client.host if request.client else "127.0.0.1"

    if verify_pin(payload.pin, user.standard_pin_hash):
        token = create_access_token({"sub": str(user.id), "is_duress": False})
        return TokenResponse(
            access_token=token,
            customer_name=f"{user.first_name} {user.last_name}",
            initials=f"{user.first_name[0]}{user.last_name[0]}",
            is_duress=False
        )

    if verify_pin(payload.pin, user.duress_pin_hash):
        dispatch_silent_emergency_alert(user_id=user.id, db=db, client_ip=client_ip)

        token = create_access_token({"sub": str(user.id), "is_duress": True})
        return TokenResponse(
            access_token=token,
            customer_name=f"{user.first_name} (Restricted)",
            initials=f"{user.first_name[0]}{user.last_name[0]}",
            is_duress=True
        )

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Passcode incorrect."
    )