# 🌿 Ziad's Plants - Premium MERN E-Commerce Store

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

A sophisticated, full-stack e-commerce platform for plant enthusiasts. Built with the **MERN** stack, this project features a state-of-the-art **Glassmorphic UI**, real-time **Inventory Management**, and a complete **Cash on Delivery (COD)** checkout system.

---

## ✨ Features

### 🛒 Shopping Experience
- **Immersive Hero Section**: Beautiful animations using `framer-motion`.
- **Dynamic Shop Grid**: Real-time plant data fetched from MongoDB.
- **Advanced Cart Logic**: Real-time stock verification and quantity limits.
- **Robust Price Parsing**: Automatically handles different price formats (e.g., $15, 15, USD 15).
- **Glassmorphic UI**: High-end design system with soft gradients and micro-animations.

### 💳 Checkout & Shipping
- **COD Ready**: A streamlined shipping form capturing Name, Email, Phone, and Location.
- **Order Success Page**: Detailed order summaries with dynamic total calculation.
- **Cart Auto-Clear**: Automatically clears the cart upon successful order placement.

### 🛠️ Admin Dashboard (`/dashboard`)
- **Inventory Control**: Full CRUD (Create, Read, Update, Delete) operations for plants.
- **Stock Management**: Real-time tracking of plant quantities.
- **Shipping History**: A dedicated view to track all customer orders, including items and total revenue.
- **Auto-Refresh**: Live updates for orders and inventory counts with a manual refresh option.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Vite, Redux Toolkit, Framer Motion, Lucide-React, Axios |
| **Backend** | Node.js, Express, Mongoose, Dotenv, CORS |
| **Database** | MongoDB Atlas (Cloud) or Local MongoDB |
| **Design** | Vanilla CSS (Premium Glassmorphism), Modern Typography (Inter & Playfair Display) |

---

## 🚀 Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas Cluster)

### 2. Environment Configuration
Navigate to the `server/` directory and set up your environment variables:
```bash
cd server
cp .env.example .env
```
Open the `.env` file and provide your MongoDB connection string:
```env
MONGODB_URI="your_mongodb_connection_string_here"
PORT=5001
```

### 3. Backend Setup
```bash
# From the server directory
npm install
node seed.js    # One-time command to seed the initial plant database
npm start       # Runs backend on http://localhost:5001
```

### 4. Frontend Setup
```bash
# Open a new terminal and navigate to the project root
npm install
npm run dev     # Runs frontend on http://localhost:5173
```

---

## 📂 Project Structure

```bash
.
├── server/               # Express Backend
│   ├── index.js          # Core API Routes (Plants, Orders)
│   ├── seed.js           # Database Initialization Script
│   └── .env.example      # Template for environment variables
├── src/                  # React Frontend
│   ├── components/       # Premium UI Elements & Navbar
│   ├── ProductList.jsx   # Shop Grid with Stock Verification
│   ├── CartItem.jsx      # Shopping Cart with Robust Price Parsing
│   ├── Checkout.jsx      # COD Shipping Form & Success Screen
│   ├── AdminDashboard.jsx# Store & Order Management
│   ├── CreateSlice.jsx   # Redux State Management
│   └── index.css         # Global Design System & Animations
└── package.json          # Frontend dependencies & scripts
```

---

## 🔧 Troubleshooting
- **Frontend can't connect to Backend**: Ensure the backend server is running on port `5001`.
- **Database is empty**: Run `node seed.js` in the `server/` directory to populate the store.
- **Total Amount $0.00**: Ensure your plant costs are correctly entered in the Admin Dashboard. The system now supports both numeric and formatted strings.

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

---
