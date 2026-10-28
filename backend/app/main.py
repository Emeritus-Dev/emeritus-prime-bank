from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.api import accounts, auth, transfers
from app.core.config import settings
from app.core.security import get_pin_hash
from app.database import Base, engine, get_db
from app.models.account import Account, User


def seed_initial_data(db: Session):
    """Seed demo user, real accounts, and decoy accounts on first startup."""
    user = db.query(User).filter(User.username == "client_prime").first()
    if not user:
        user = User(
            username="client_prime",
            full_name="Tshegofatso Hlabela",
            initials="TH",
            standard_pin_hash=get_pin_hash("1234"),
            duress_pin_hash=get_pin_hash("9999"),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # Standard / Real Accounts
        real_accounts = [
            Account(
                user_id=user.id,
                name="Sovereign Private Cheque",
                account_number="EPB-8902-114",
                account_type="cheque",
                balance=1245000.00,
                is_decoy=False,
            ),
            Account(
                user_id=user.id,
                name="Liquidity Reserve Vault",
                account_number="EPB-4401-992",
                account_type="savings",
                balance=850000.00,
                is_decoy=False,
            ),
            Account(
                user_id=user.id,
                name="Offshore Capital Asset",
                account_number="EPB-7712-300",
                account_type="investment",
                balance=3400000.00,
                is_decoy=False,
            ),
        ]

        # Decoy Accounts (Shown under Duress PIN 9999)
        decoy_accounts = [
            Account(
                user_id=user.id,
                name="Standard Everyday Cheque",
                account_number="EPB-1029-441",
                account_type="cheque",
                balance=1450.00,
                is_decoy=True,
            ),
            Account(
                user_id=user.id,
                name="Emergency Savings",
                account_number="EPB-3391-002",
                account_type="savings",
                balance=320.00,
                is_decoy=True,
            ),
        ]

        db.add_all(real_accounts + decoy_accounts)
        db.commit()
        print("✓ Database successfully seeded with Standard ('1234') and Duress ('9999') credentials.")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    try:
        seed_initial_data(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# Enable CORS for Expo Mobile Web and Native Clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(accounts.router, prefix=f"{settings.API_V1_STR}/accounts", tags=["accounts"])
app.include_router(transfers.router, prefix=f"{settings.API_V1_STR}/transfers", tags=["transfers"])


@app.get("/")
def health_check():
    return {
        "status": "online",
        "system": settings.PROJECT_NAME,
        "environment": "development",
    }