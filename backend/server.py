from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Query, Path
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timedelta
import bcrypt
import jwt
from enum import Enum
import asyncio
from decimal import Decimal
import json

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-here')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DELTA = timedelta(days=7)

# Create the main app
app = FastAPI(
    title="Sow2Grow Farm Mall API",
    description="364yhvh Community Farm & Sow2Grow Farm Mall Platform",
    version="1.0.0"
)

# Create API router with /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# ===== ENUMS =====
class UserRole(str, Enum):
    USER = "user"
    GROWER = "grower"
    ADMIN = "admin"

class AccountType(str, Enum):
    PERSONAL = "personal"
    BUSINESS = "business"

class OrchardStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    PAUSED = "paused"
    CANCELLED = "cancelled"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

class PaymentMethod(str, Enum):
    CARD = "card"
    PAYPAL = "paypal"

class GrowthStage(str, Enum):
    SPROUT = "sprout"
    YOUNG = "young"
    GROWING = "growing"
    MATURE = "mature"

class GiftCategory(str, Enum):
    ART = "The Gift of Art"
    ACCESSORIES = "The Gift of Accessories"
    ADVENTURE = "The Gift of Adventure Packages"
    APPLIANCES = "The Gift of Appliances"
    CUSTOM = "The Gift of Custom Made"
    DIY = "The Gift of DIY"
    ELECTRONICS = "The Gift of Electronics"
    ENERGY = "The Gift of Energy"
    FREEWILL = "The Gift of Free-will Gifting"
    INNOVATION = "The Gift of Innovation"
    KITCHENWARE = "The Gift of Kitchenware"
    MUSIC = "The Gift of Music"
    NOURISHMENT = "The Gift of Nourishment"
    PAYASYOUGO = "The Gift of Pay as You Go"
    PROPERTY = "The Gift of Property"
    SERVICES = "The Gift of Services"
    TECHNOLOGY = "The Gift of Technology"
    TITHING = "The Gift of Tithing"
    TOOLS = "The Gift of Tools"
    VEHICLES = "The Gift of Vehicles"
    WELLNESS = "The Gift of Wellness"

# ===== DATABASE MODELS =====
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    first_name: str
    last_name: str
    role: UserRole = UserRole.USER
    is_email_verified: bool = False
    is_identity_verified: bool = False
    location: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    location: Optional[str] = None
    phone: Optional[str] = None

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None

class PayPalAccount(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    email: EmailStr
    account_type: AccountType = AccountType.PERSONAL
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    business_name: Optional[str] = None
    country: str = "US"
    currency: str = "USD"
    auto_payouts: bool = True
    minimum_payout: float = 50.0
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_verified: Optional[datetime] = None

class PayPalAccountCreateRequest(BaseModel):
    email: EmailStr
    account_type: AccountType = AccountType.PERSONAL
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    business_name: Optional[str] = None
    country: str = "US"
    currency: str = "USD"
    auto_payouts: bool = True
    minimum_payout: float = Field(default=50.0, ge=50.0, le=10000.0)

class Orchard(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str  # The grower (farm stall owner)
    title: str
    description: str
    category: GiftCategory = GiftCategory.TECHNOLOGY
    seed_value: float  # Total amount needed
    pocket_price: float = 150.0  # Price per pocket
    total_pockets: int  # Calculated from seed_value / pocket_price
    filled_pockets: int = 0
    location: Optional[str] = None
    timeline: Optional[str] = None
    why_needed: str
    community_impact: str
    features: List[str] = []
    images: List[str] = []
    video_url: Optional[str] = None
    status: OrchardStatus = OrchardStatus.ACTIVE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    verified: bool = False
    views: int = 0
    supporters: int = 0
    completion_rate: float = 0.0
    payout_processed: bool = False

class OrchardCreateRequest(BaseModel):
    title: str
    description: str
    category: GiftCategory = GiftCategory.TECHNOLOGY
    seed_value: float = Field(gt=0)
    pocket_price: float = Field(default=150.0, gt=0)
    location: Optional[str] = None
    timeline: Optional[str] = None
    why_needed: str
    community_impact: str
    features: List[str] = []
    images: List[str] = []
    video_url: Optional[str] = None

class OrchardUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[GiftCategory] = None
    location: Optional[str] = None
    timeline: Optional[str] = None
    why_needed: Optional[str] = None
    community_impact: Optional[str] = None
    features: Optional[List[str]] = None
    images: Optional[List[str]] = None
    video_url: Optional[str] = None

class Pocket(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    orchard_id: str
    pocket_number: int
    user_id: str  # The bestower
    amount: float
    growth_stage: GrowthStage = GrowthStage.SPROUT
    days_growing: int = 0
    bestower_name: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Payment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    orchard_id: Optional[str] = None
    payment_type: str  # "orchard_bestowal", "tithing", "free_will_gifting"
    amount: float
    currency: str = "USD"
    method: PaymentMethod
    status: PaymentStatus = PaymentStatus.PENDING
    payment_id: Optional[str] = None  # External payment ID
    order_id: Optional[str] = None  # PayPal order ID
    description: str
    metadata: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PaymentCreateRequest(BaseModel):
    orchard_id: Optional[str] = None
    payment_type: str
    amount: float
    currency: str = "USD"
    method: PaymentMethod
    description: str
    metadata: Dict[str, Any] = {}

class Analytics(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime
    category: Optional[GiftCategory] = None
    total_orchards: int = 0
    new_orchards: int = 0
    completed_orchards: int = 0
    active_orchards: int = 0
    total_seed_value: float = 0.0
    total_bestowed: float = 0.0
    completion_rate: float = 0.0
    total_bestowals: int = 0
    unique_bestowers: int = 0
    total_views: int = 0
    success_rate: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)

# ===== RESPONSE MODELS =====
class APIResponse(BaseModel):
    success: bool
    data: Any = None
    message: Optional[str] = None
    error: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    request_id: str = Field(default_factory=lambda: str(uuid.uuid4()))

class LoginResponse(BaseModel):
    user: Dict[str, Any]
    access_token: str
    refresh_token: str

class PocketSelectionRequest(BaseModel):
    orchard_id: str
    pocket_numbers: List[int]

# ===== UTILITY FUNCTIONS =====
def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + JWT_EXPIRATION_DELTA
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ===== AUTHENTICATION MIDDLEWARE =====
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    token = credentials.credentials
    payload = verify_token(token)
    user_id = payload.get("user_id")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    # Get user from database
    user_doc = await db.users.find_one({"id": user_id})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    
    return User(**user_doc)

async def get_current_user_optional(authorization: str = Header(None)):
    """Get current user from JWT token (optional)"""
    if not authorization:
        return None
    
    try:
        token = authorization.replace("Bearer ", "")
        payload = verify_token(token)
        user_id = payload.get("user_id")
        
        if not user_id:
            return None
        
        user_doc = await db.users.find_one({"id": user_id})
        if not user_doc:
            return None
        
        return User(**user_doc)
    except:
        return None

# ===== API ENDPOINTS =====

# Root endpoint
@api_router.get("/")
async def root():
    """Root endpoint for API health check"""
    return APIResponse(
        success=True,
        data={"message": "Welcome to Sow2Grow Farm Mall API"},
        message="API is running successfully"
    )

# Authentication endpoints
@api_router.post("/auth/register", response_model=APIResponse)
async def register_user(request: UserCreateRequest):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": request.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        user = User(
            email=request.email,
            password_hash=hash_password(request.password),
            first_name=request.first_name,
            last_name=request.last_name,
            location=request.location,
            phone=request.phone
        )
        
        # Insert user into database
        await db.users.insert_one(user.dict())
        
        # Create access token
        access_token = create_access_token({"user_id": user.id})
        
        user_data = user.dict()
        user_data.pop("password_hash")  # Remove password hash from response
        
        return APIResponse(
            success=True,
            data={
                "user": user_data,
                "access_token": access_token,
                "refresh_token": access_token  # For simplicity, using same token
            },
            message="User registered successfully"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/auth/login", response_model=APIResponse)
async def login_user(request: UserLoginRequest):
    """Login user and return JWT token"""
    try:
        # Find user by email
        user_doc = await db.users.find_one({"email": request.email})
        if not user_doc:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        user = User(**user_doc)
        
        # Verify password
        if not verify_password(request.password, user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Create access token
        access_token = create_access_token({"user_id": user.id})
        
        user_data = user.dict()
        user_data.pop("password_hash")  # Remove password hash from response
        
        return APIResponse(
            success=True,
            data={
                "user": user_data,
                "access_token": access_token,
                "refresh_token": access_token  # For simplicity, using same token
            },
            message="Login successful"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Continue with more endpoints...
# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)