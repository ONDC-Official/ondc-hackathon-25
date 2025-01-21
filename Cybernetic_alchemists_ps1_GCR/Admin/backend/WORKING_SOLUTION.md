# Working Solution Guide

## Getting Started

1. First ensure MongoDB is running locally on port 27017 or update MONGODB_URI in .env

2. Install dependencies and setup database:
```bash
cd backend
npm install
npm run setup
```

3. Start the server:
```bash
npm run dev
```

## Default Login Credentials
```
Email: admin@admin.com
Password: admin123
```

## Testing API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register 
POST /api/auth/logout
GET /api/auth/me
```

### Products
```
GET /api/products
GET /api/products/search?q=searchterm
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
POST /api/products/:id/upload 
POST /api/products/:id/print
```

### Users & Profile
```
GET /api/users
POST /api/users
GET /api/profile
PUT /api/profile
POST /api/profile/avatar
```

### File Operations
```
GET /api/download/:filename
```

## Common Issues & Solutions

1. File Upload/Download Issues:
- Ensure uploads directory exists and has write permissions
- Check file size limits in .env (default 5MB)
- Verify allowed file types in multer config
- Sanitize filenames before saving

2. Database Connection Issues:
- Verify MongoDB is running
- Check connection string in .env
- Look for errors in logs/error.log

3. Authentication Issues:
- Ensure JWT_SECRET is set in .env
- Token expires after 24h by default
- Use x-auth-token header for protected routes

## Security Features

1. Rate Limiting:
- 100 requests per 15 minutes per IP
- Custom error message for rate limit exceeded

2. File Upload Security:
- File size limit
- Allowed file types
- Sanitized filenames
- Secure file paths

3. API Security:
- Helmet for security headers
- CORS configuration
- JWT authentication
- Input validation
- Error handling middleware

## Development Tips

1. Monitor logs:
- Check logs/error.log for errors
- Check logs/combined.log for all logs

2. Use environment variables:
- Copy .env.example to .env
- Set proper values for your environment

3. Testing uploads:
- Use multipart/form-data
- Maximum file size: 5MB
- Allowed types: jpeg, jpg, png, gif, pdf, doc, docx, xls, xlsx