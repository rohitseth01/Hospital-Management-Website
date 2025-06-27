# 🏥 Hospital Management Website

A full-stack **Hospital Management System** built with the **MERN stack** that allows **Admins**, **Doctors**, and **Users** to manage appointments, doctor availability, and user records with ease.

---

## 🚀 Features

### 👤 Admin Panel
- Add, edit, or remove doctors
- View all registered users and appointments
- Dashboard analytics for system overview

### 👨‍⚕️ Doctor Panel
- Manage availability and profile
- View and update appointment status
- View patient history

### 🧑 User Panel
- Register/Login securely
- Book appointments with doctors by speciality
- View booking history and profile

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Axios
- Context API / Redux (if used)

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose

### Other Tools:
- JWT Authentication
- Cloudinary (for doctor profile image uploads)
- Razorpay / Stripe (if payment is integrated)

---

## 📁 Folder Structure
prescripto/
├── admin/
│ └── .env.sample
├── frontend/
│ └── .env.sample
├── backend/
│ ├── .env.sample
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── middleware/

## 🔐 Environment Setup

Create `.env` files from `.env.sample` inside each folder:

### 📦 Backend `.env`
PORT=8000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

shell
Copy
Edit

### 🧑 Frontend `.env`
VITE_API_BASE_URL=http://localhost:8000/api/v1

shell
Copy
Edit

### 👤 Admin `.env`
VITE_ADMIN_API_URL=http://localhost:8000/api/v1/admin

yaml
Copy
Edit

---

## 💻 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/rohitseth01/Hospital-Management-Website.git
cd Hospital-Management-Website

2. Install dependencies

Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

Admin
cd ../admin
npm install

3. Run the application

Backend
cd backend
npm start

Frontend
cd frontend
npm run dev

Admin
cd admin
npm run dev
