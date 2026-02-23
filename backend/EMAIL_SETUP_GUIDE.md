# Email Setup Guide for Contact Form

## Prerequisites
1. A Gmail account with 2-Factor Authentication enabled
2. Generate an App Password for this application

## Step-by-Step Setup

### 1. Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the instructions to enable 2FA if not already enabled

### 2. Generate App Password
1. Still in Security settings, find "App passwords"
2. Click "App passwords" (you may need to sign in again)
3. Select "Mail" as the app and "Windows Computer" as the device
4. Click "Generate"
5. Copy the 16-character password (it looks like: "abcd efgh ijkl mnop")

### 3. Configure Email Settings
1. Open `backend/email_config.py`
2. Replace the values:
   ```python
   SENDER_EMAIL = "youremail@gmail.com"  # Your Gmail address
   SENDER_PASSWORD = "abcd efgh ijkl mnop"  # The 16-character app password
   RECIPIENT_EMAIL = "youremail@gmail.com"  # Where you want to receive messages
   ```

### 4. Test the Setup
1. Restart your backend server
2. Go to your portfolio website
3. Fill out the contact form and submit
4. Check your email inbox for the notification

## Important Notes
- Never use your regular Gmail password - always use the App Password
- Keep your App Password secure and don't share it
- The App Password is specifically for this application
- If you change your Google password, you'll need to generate a new App Password

## Troubleshooting
- If emails aren't sending, check the backend terminal for error messages
- Make sure 2FA is enabled on your Google account
- Verify the App Password is correct (16 characters with spaces)
- Check your spam folder for test emails