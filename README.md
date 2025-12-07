# PH_Assignment_2

## 🚗 Vehicle Booking System  

🔗 **Live URL:** https://ph-assignment-2-ratul.vercel.app/

A backend system for managing vehicle booking, users, and role-based access using Node.js, TypeScript, and Express.js.

---

## 🚀 Features  

- Role-based access control (RBAC)
- User authentication
- Secure API endpoints
- Vehicle booking
- Admin and normal user support
- REST API architecture
- Validation & error handling

---

## 🛠 Technology Stack  

### Backend
- Node.js
- TypeScript
- Express.js

### Authentication
- JWT-based auth

### Database
- PostgreSQL

## 📂 Project Folder Structure  
```sh
src/
|── auth/
│── modules/
│── middlewares/
│── config/
│── type/
│── app.ts
└── server.ts
```

## ⚙️ Setup & Installation  

### 1️⃣ Clone the repository  

```sh
git clone https://github.com/<your-username>/vehicle-booking-system.git
cd vehicle-booking-system
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Configure environment variables
Create a .env file in the root directory and add:
```sh
PORT=5000
DATABASE_URL=your-db-url
JWT_SECRET=your-secret
```
### 4️⃣ Build TypeScript
```sh
npm run build
```
### 5️⃣ Start the Server
Development
```sh
npm run start
```
API Base URL → http://localhost:5000

### ▶️ Example Scripts
```sh
npm run build
npm run start
```
### 🔐 User Roles
- Role	Permission
- Admin	Manage vehicles, manage bookings
- User	Book vehicle

### 🧪 API Testing
You can test APIs using:

- Postman
- Thunder Client
- Insomnia

📄 License
Open source project — can be used for learning and portfolio purposes.
