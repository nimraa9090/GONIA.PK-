# Goniaa Fashion - Backend API

Node.js/Express API server for Goniaa Fashion e-commerce platform.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and set:
- DATABASE_URL (PostgreSQL connection string)
- JWT_SECRET (random 32+ character string)
- ADMIN_PASSWORD (secure password)

### 3. Initialize Database
```bash
npm run db:push
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Run database migrations
- `npm run db:generate` - Generate migration files
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (admin)
- `DELETE /api/orders/:id` - Delete order (admin)

### Authentication
- `POST /api/auth/login` - Login admin
- `POST /api/auth/register` - Register admin

### Analytics
- `POST /api/analytics/track` - Track event
- `GET /api/analytics/dashboard` - Get dashboard stats (admin)

### Brand Settings
- `GET /api/brand-settings` - Get settings
- `PUT /api/brand-settings` - Update settings (admin)

## Deployment

### Render
1. Connect GitHub repository
2. Create Web Service
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables
6. Add PostgreSQL database
7. Deploy

### Railway
1. Connect GitHub
2. Add PostgreSQL database
3. Set environment variables
4. Deploy

## Database Schema

Tables:
- `categories` - Product categories
- `products` - Product listings
- `orders` - Customer orders
- `brand_settings` - App configuration
- `analytics` - Event tracking
- `admin_users` - Admin accounts

## Authentication

Admin endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Support

For issues or questions, check the deployment guides.
