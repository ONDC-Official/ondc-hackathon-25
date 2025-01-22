# Admin Panel Backend

This is the backend server for the admin panel application. It provides a complete REST API for managing users, products, orders, customers, and inventory.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/admin_panel
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/user - Get logged in user details

### Users
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Create new product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product

### Orders
- GET /api/orders - Get all orders
- GET /api/orders/:id - Get order by ID
- POST /api/orders - Create new order
- PUT /api/orders/:id - Update order status
- DELETE /api/orders/:id - Delete order

### Customers
- GET /api/customers - Get all customers
- GET /api/customers/:id - Get customer by ID
- POST /api/customers - Create new customer
- PUT /api/customers/:id - Update customer
- DELETE /api/customers/:id - Delete customer

### Inventory
- GET /api/inventory - Get all inventory items
- GET /api/inventory/:id - Get inventory item by ID
- POST /api/inventory - Create new inventory item
- PUT /api/inventory/:id - Update inventory item
- DELETE /api/inventory/:id - Delete inventory item

## Security
- JWT-based authentication
- Password hashing with bcrypt
- Input validation with express-validator
- Protected routes with authentication middleware

## Error Handling
- Proper error responses for invalid requests
- Server error handling
- Mongoose error handling
- Validation error handling

## Database
- MongoDB with Mongoose ORM
- Proper data modeling with schemas
- Relationships between collections
- Data validation at schema level