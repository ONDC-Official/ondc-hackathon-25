# Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- NPM or Yarn

## Installation Steps

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your configuration
- Make sure MongoDB is running

3. Initialize database:
```bash
# Create admin user
node setup.js
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Default Admin Credentials
- Email: admin@admin.com
- Password: admin123

## API Testing

Test the API endpoints using Postman or similar tools:

1. Authentication
```
POST /api/auth/login
{
    "email": "admin@admin.com",
    "password": "admin123"
}
```

2. Products
```
GET /api/products
Headers: x-auth-token: <your-token>
```

3. File Operations
- Ensure the 'uploads' directory exists and has write permissions
- Test file upload with multipart/form-data
- Test file download with generated URLs

## Common Issues

1. MongoDB Connection
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

2. File Operations
- Check uploads directory permissions
- Verify file size limits in .env
- Ensure proper file types are used

3. Authentication
- Check JWT_SECRET in .env
- Verify token expiration settings
- Test with proper headers

## Security Considerations

1. Rate Limiting
- Default: 100 requests per 15 minutes
- Configurable in server.js

2. File Upload Security
- Size limit: 5MB default
- Allowed types: images, PDFs, documents
- Sanitized filenames

3. API Security
- CORS configured for development/production
- JWT authentication required
- Request validation implemented