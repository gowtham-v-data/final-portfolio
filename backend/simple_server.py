from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime, timezone
import logging
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# In-memory storage for demo purposes
contact_messages = []
status_checks = []

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

# Email configuration
try:
    from email_config import SMTP_SERVER, SMTP_PORT, SENDER_EMAIL, SENDER_PASSWORD, RECIPIENT_EMAIL
    
    # Check if password is still placeholder
    if SENDER_PASSWORD == "PUT_YOUR_16_DIGIT_APP_PASSWORD_HERE" or SENDER_PASSWORD == "abcd efgh ijkl mnop":
        logging.warning("Email password not configured. Email sending will be disabled.")
        EMAIL_ENABLED = False
        EMAIL_CONFIG = {}
    else:
        EMAIL_CONFIG = {
            "smtp_server": SMTP_SERVER,
            "smtp_port": SMTP_PORT,
            "sender_email": SENDER_EMAIL,
            "sender_password": SENDER_PASSWORD,
            "recipient_email": RECIPIENT_EMAIL
        }
        EMAIL_ENABLED = True
except ImportError:
    logging.warning("Email configuration not found. Email sending will be disabled.")
    EMAIL_ENABLED = False
    EMAIL_CONFIG = {}

def send_email(name: str, email: str, message: str):
    """Send email notification when a contact form is submitted"""
    if not EMAIL_ENABLED:
        logging.warning("Email is not configured. Skipping email sending.")
        return False
        
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = EMAIL_CONFIG["sender_email"]
        msg['To'] = EMAIL_CONFIG["recipient_email"]
        msg['Subject'] = f"New Contact Form Submission from {name}"
        
        # Create email body
        body = f"""
        You have received a new message from your portfolio contact form:
        
        Name: {name}
        Email: {email}
        
        Message:
        {message}
        
        ---
        This email was sent automatically from your portfolio website.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Create SMTP session
        server = smtplib.SMTP(EMAIL_CONFIG["smtp_server"], EMAIL_CONFIG["smtp_port"])
        server.starttls()  # Enable TLS encryption
        server.login(EMAIL_CONFIG["sender_email"], EMAIL_CONFIG["sender_password"])
        
        # Send email
        text = msg.as_string()
        server.sendmail(EMAIL_CONFIG["sender_email"], EMAIL_CONFIG["recipient_email"], text)
        server.quit()
        
        logging.info(f"Email sent successfully for contact from {name} ({email})")
        return True
        
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
        return False

# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World", "status": "API is working!"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.dict())
    status_checks.append(status_obj)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    return status_checks

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_obj = ContactMessage(**input.dict())
    contact_messages.append(contact_obj)
    
    # Log the contact message
    logging.info(f"New contact message from {contact_obj.name} ({contact_obj.email}): {contact_obj.message}")
    
    # Send email notification
    email_sent = send_email(contact_obj.name, contact_obj.email, contact_obj.message)
    
    if email_sent:
        logging.info("Email notification sent successfully")
    else:
        logging.warning("Failed to send email notification")
    
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    return contact_messages

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Allow all origins for development
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)