# Inventory Management System (POC)

A full-stack Inventory Management System built as a **Proof of Concept (POC)** to address real-world inventory challenges faced by Indian Architecture, Engineering, and Construction (AEC) material suppliers.

This system provides **real-time inventory visibility**, **low-stock alerts**, and a **simple dashboard** to help businesses reduce dead stock, avoid stockouts, and scale operations with confidence.

---

## 🚩 Problem Statement

Most Indian building material suppliers manage inventory manually using spreadsheets or registers. This results in:
- Poor visibility into current stock levels
- Overstocking slow-moving items (dead stock)
- Understocking fast-moving SKUs
- No proactive low-stock alerts
- Low margins and poor scalability

This project demonstrates how a lightweight, tech-driven solution can solve these issues effectively.

---

## ✅ Solution Overview

The Inventory Management System centralizes inventory data and provides:
- A single source of truth for stock levels
- Real-time low-stock detection
- Easy stock updates (add/remove/adjust)
- Clear, visual inventory insights

---

## ✨ Features

- 📦 **Product Management (CRUD)**
  - Add, edit, view, and soft-delete products
- 🔄 **Stock Updates**
  - Add stock, remove stock, or adjust inventory
- 🚨 **Low-Stock Alerts**
  - Automatic detection when stock falls below minimum level
- 📊 **Dashboard**
  - Total products
  - Low-stock count
  - Inventory overview
- 🔍 **Search & Filter**
  - Search by product name or SKU
  - Filter by category
- 📱 **Responsive UI**
  - Works seamlessly on desktop and mobile

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14 (App Router)**
- **Tailwind CSS**
- Fetch API
- lucide-react (icons)

### Backend
- **Express.js**
- **MongoDB + Mongoose**
- express-validator
- dotenv, cors

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas


🌐 API Endpoints
Products
bash
Copy code
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
PATCH  /api/products/:id/stock
DELETE /api/products/:id
Alerts
bash
Copy code
GET    /api/alerts/low-stock

⚙️ Setup Instructions
Backend Setup
bash
Copy code
cd backend
npm install
Create .env file:

env
Copy code
PORT=5000
MONGODB_URI=your_mongodb_connection_string
Run backend:

bash
Copy code
npm run dev
Frontend Setup
bash
Copy code
cd frontend
npm install
Create .env.local:
env

Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000/api
Run frontend:

bash
Copy code
npm run dev


Live Demo
Frontend: https://inventory-manager-app-omega.vercel.app/

Backend API: https://inventory-manager-app-e50w.onrender.com/

(Replace with actual deployed links)


Assumptions (POC Scope)
Single inventory location

Manual stock updates

No authentication (POC only)

Internet connectivity available



🔮 Future Enhancements
Multi-location inventory support

Barcode / QR scanning

Purchase order management

Supplier management

Inventory analytics & forecasting

Role-based access control


🧠 Key Learnings
Designing tech solutions for real business problems

Building scalable backend APIs

Managing inventory edge cases (negative stock, alerts)

Clean UI/UX for operational tools



👤 Author

Rajesh Kumar Yadav

Final Year B.Tech (CSE), IIIT Manipur

