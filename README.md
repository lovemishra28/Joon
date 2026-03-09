# 🛍️ June - Full-Stack E-Commerce Platform

A modern, production-ready e-commerce marketplace built with **Next.js**, **React**, and **MongoDB**. This platform enables complete digital retail operations with intuitive interfaces for both buyers and sellers.

Project Deployment Link: https://joon-trk4.vercel.app/

---

## 📋 Overview

**June** is a comprehensive e-commerce solution designed to solve a critical problem: small businesses and individual sellers lack accessible, fully-featured platforms to digitalize their retail operations. Traditional e-commerce solutions are expensive, overly complex, or missing essential features.

This project delivers a **complete, scalable marketplace** that bridges the gap between sellers and buyers—enabling end-to-end transactions from product discovery and purchase to order fulfillment and inventory management. Whether you're exploring modern web development or building an actual online store, this project demonstrates professional-grade architecture and best practices.

---

## ✨ Key Features

### 🛒 **For Customers**
- **Secure User Authentication** — Register and login with email/password using JWT tokens and bcrypt encryption
- **Product Discovery** — Browse dynamic product catalogs with pagination, filtering, and detailed product pages
- **Shopping Cart** — Add/remove items, adjust quantities, and enjoy persistent cart storage across sessions
- **Checkout Workflow** — Multi-step checkout with address capture, order summary, and payment method selection
- **Order Tracking** — View purchase history and monitor order status in real-time (Order Placed → Processing → Shipped → Delivered)
- **User Profile** — Manage personal information and access detailed order records

### 🏪 **For Sellers**
- **Inventory Management** — Add, edit, and delete product listings with multi-image upload via Cloudinary
- **Product Categorization** — Organize products by category with pricing controls and inventory tracking
- **Order Management** — Centralized dashboard for viewing, processing, and updating order statuses
- **Analytics Dashboard** — Track product performance, total listings, and inventory overview
- **Bulk Operations** — Efficiently manage multiple orders and product updates

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Radix UI Components |
| **Backend** | Next.js API Routes (Serverless Functions) |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **Cloud Services** | Cloudinary (Image Management & CDN) |
| **Animations** | Framer Motion |
| **State Management** | React Hooks, Server-side Data Fetching |
| **Testing** | Vitest, Playwright |

---

## 📦 Installation & Setup

### Prerequisites
Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **pnpm** package manager
- **MongoDB** (local instance or MongoDB Atlas cloud cluster)
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd june
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Configure Environment Variables
Create a `.env.local` file in the project root and copy the contents from `.env.example`:

```bash
cp .env.example .env.local
```

Then update the `.env.local` file with your credentials:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Environment Variables Explained:**
- **MONGODB_URI** — Connection string to your MongoDB database
- **JWT_SECRET** — Secret key for signing JWT authentication tokens
- **CLOUDINARY_*** — API credentials for image upload and optimization (get these from [Cloudinary](https://cloudinary.com))

### Step 4: Run the Development Server
```bash
npm run dev
```

The application will be available at **http://localhost:3000**

### Step 5: Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

Here's an overview of the project organization:

```
june/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── api/                      # Backend API routes (15+ endpoints)
│   │   │   ├── auth/ (login, register, logout)
│   │   │   ├── product/ (list, add, overview)
│   │   │   ├── cart/ (get, update)
│   │   │   ├── order/ (place, user orders)
│   │   │   └── seller/ (manage orders, order status)
│   │   ├── shop/                     # Customer shopping pages
│   │   ├── cart/                     # Shopping cart page
│   │   ├── ProductDetail/            # Dynamic product detail pages
│   │   ├── place-order/              # Checkout workflow
│   │   ├── myOrders/                 # Order history page
│   │   ├── profile/                  # User profile page
│   │   ├── seller/                   # Seller dashboard
│   │   │   ├── dashboard/            # Seller overview
│   │   │   ├── add-product/          # Add new product
│   │   │   └── manageProduct/        # Manage inventory
│   │   ├── login/                    # Login page
│   │   ├── register/                 # Registration page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── ... (more components)
│   │   └── navbar/ & footer/         # Layout components
│   ├── models/                       # MongoDB schemas
│   │   ├── UserModel.ts              # User data structure
│   │   ├── ProductModel.ts           # Product data structure
│   │   └── OrderModel.ts             # Order data structure
│   ├── lib/
│   │   ├── db.ts                     # MongoDB connection
│   │   └── utils.ts                  # Utility functions
│   ├── middleware.ts                 # Next.js middleware (auth protection)
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── components/                       # Global components
│   ├── ProductItems.tsx
│   ├── navbar/
│   ├── footer/
│   ├── ui/
│   │   └── FadeImage.tsx
│   └── assets/
├── public/                           # Static assets (images, icons)
├── package.json                      # NPM dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── vitest.config.ts                  # Testing configuration
├── eslint.config.mjs                 # Code linting rules
├── .env.example                      # Example environment variables
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

### Key Folders Explained:

- **`src/app/api/`** — RESTful API endpoints handling business logic (authentication, products, cart, orders)
- **`src/app/`** (pages) — Customer-facing and seller-facing pages with server-side and client-side rendering
- **`src/models/`** — MongoDB data schemas defining structure for users, products, and orders
- **`src/components/ui/`** — Reusable, styled React components using Tailwind CSS and Radix UI
- **`types/`** — TypeScript type definitions ensuring type safety across the application

---

## 🚀 Getting Started

### First Time Setup
1. Clone the repository and install dependencies (see Installation & Setup above)
2. Configure your `.env.local` file with MongoDB and Cloudinary credentials
3. Run `npm run dev` to start the development server
4. Open **http://localhost:3000** in your browser

### Explore the Application

**As a Customer:**
- Visit the home page to browse products
- Register/login to enable shopping features
- Add items to your cart
- Complete checkout to place an order
- Visit "My Orders" to track your purchases

**As a Seller:**
- Login with seller credentials
- Navigate to the seller dashboard
- Add new products with images from the `add-product` page
- Manage your inventory from `manageProduct`
- View and update order statuses in the order management section

### Available Scripts

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint to check code quality
```

---

## 📄 Supporting Development Files

This project follows professional development practices with several important supporting files:

### **`package.json`** — Project Configuration & Dependencies
- Lists all npm dependencies with versions (Next.js, React, MongoDB, etc.)
- Defines npm scripts for development, building, and testing
- Includes devDependencies for linting and testing tools
- **Purpose:** Ensures consistent environment setup across team members

### **`.env.example`** — Environment Variables Template
- Provides a template of required environment variables
- Documents what credentials and configurations are needed
- **Best Practice:** Helps team members understand the setup without exposing secrets
- Never commit `.env.local` (it's in `.gitignore`), only commit `.env.example`

### **`.gitignore`** — Git Ignore Rules
- Excludes sensitive files from version control:
  - `.env.local` (contains API keys and secrets)
  - `node_modules/` (dependencies, can be reinstalled via npm)
  - `.next/` (build artifacts)
  - `dist/` (build outputs)
- **Purpose:** Keeps your repository clean and protects sensitive information

### **`tsconfig.json`** — TypeScript Configuration
- Defines strict type checking rules
- Configures module resolution and output settings
- Ensures consistent TypeScript behavior across the project

### **`next.config.ts`** — Next.js Configuration
- Sets up Next.js features and optimizations
- Configures image optimization for Cloudinary
- Defines API route handling

---

## 🔐 Security Highlights

- **Password Security:** Passwords are hashed using bcrypt with configurable salt rounds
- **Token Security:** JWT tokens are stored in HTTP-only cookies (secure against XSS attacks)
- **Route Protection:** Next.js middleware protects authenticated routes
- **Environment Secrets:** Sensitive data stored in `.env.local` (never committed to Git)

---

## 📚 Learning Resources

This project is an excellent resource for learning:
- **Full-stack development** with Next.js and MongoDB
- **REST API design** with proper HTTP methods and status codes
- **Authentication flows** with JWT and password encryption
- **Database modeling** and relationships in MongoDB
- **Component design** with React and TypeScript
- **Professional project organization** and best practices

---

## 🎯 Future Enhancements

Potential features for expansion:
- Payment gateway integration (Stripe, PayPal)
- Email notifications for orders
- Product reviews and ratings
- Wishlist functionality
- Advanced search and filtering
- Admin dashboard for platform management
- Mobile app (React Native)

---

## 📝 License

This project is open source. Feel free to use it as a learning resource or starting point for your own projects.

---

## 💡 Questions or Issues?

If you encounter any issues or have questions about the project:
1. Check the existing documentation files (`PROJECT_SUMMARY.md`, `RESUME_PROJECT_DESCRIPTION.md`)
2. Review the code comments in the API routes and models
3. Explore the component implementations in `src/components/` for best practices

---

**Happy coding! 🚀** Built with passion for modern web development.
