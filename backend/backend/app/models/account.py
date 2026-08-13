from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from database import Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    account_number = Column(String, unique=True)
    name = Column(String)
    account_type = Column(String)
    balance = Column(Float, default=0.0)
    is_decoy = Column(Boolean, default=False)
    is_frozen = Column(Boolean, default=False)