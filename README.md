🎨 Booking System Frontend (React + Vite + TypeScript + TailwindCSS)

A modern, responsive frontend application for the Booking System API.
Built with React, Vite, TypeScript, and TailwindCSS, this UI allows users to manage resources, create bookings, and track booking statuses, while admins can approve, reject, or cancel bookings.

This project demonstrates scalable frontend architecture with reusable components, API integration, and clean UI design.

🚀 Features

🔐 Authentication – Login & Register with JWT

👥 Role-based UI – Admin vs User experience

📅 Bookings

Create bookings for resources

View personal bookings

Cancel a booking

Status tracking: pending, approved, cancelled, rejected

🛠 Admin Panel

View all bookings

Approve or reject user bookings

🎨 Responsive UI with TailwindCSS

⚡️ Fast build & dev experience with Vite

📂 Organized React structure:

components/ → Reusable UI components

pages/ → Route pages

api/ → API service layer

context/ → Authentication & state management

App.tsx → Router setup

🗂 Project Structure
frontend-booking-system/
├── src/
│   ├── api/
│   │   └── bookingApi.ts
│   ├── components/
│   │   ├── BookingCard.tsx
│   │   └── Navbar.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── MyBookings.tsx
│   │   ├── AllBookings.tsx
│   │   └── Resources.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md

⚙️ Tech Stack

React 18 + TypeScript – Frontend framework

Vite – Next-gen build tool (fast dev server & HMR)

TailwindCSS – Utility-first styling

Axios / Fetch – API requests

React Router – Routing & navigation

Context API – Authentication & state management

🔑 Pages & Workflows
Authentication

Login → Sign in, receive JWT

Register → Create new account

Bookings

My Bookings → User’s personal bookings

Cancel if needed

View booking status

All Bookings (Admin only)

Approve or reject bookings

Filter bookings by status (pending, approved, etc.)

Resources

View available resources

Create bookings against resources

🛠 Installation & Setup

Clone repo

git clone https://github.com/alexrider187/booking-systems-frontend.git
cd booking-system-frontend


Install dependencies

npm install


Setup environment variables
Create a .env file in the root:

VITE_API_URL=http://localhost:5000/api


Run in development

npm run dev


Build for production

npm run build
npm run preview

📸 UI Preview

🔐 Login & Register

📅 My Bookings page (status tracking: pending → approved/cancelled/rejected)

🛠 Admin dashboard (approve/reject bookings)

✅ What This Project Shows Employers

Strong frontend engineering with TypeScript

Real-world API integration with backend

State management (Context API + hooks)

Component-driven development with reusable UI

TailwindCSS for fast & clean styling

Scalable project structure for production apps

📌 Future Improvements

Add pagination & filtering in All Bookings

Toast notifications for status changes

Dark mode UI

CI/CD with Docker + GitHub Actions

👨‍💻 Author

Built by [Dickson Ngari] 🚀
If you're hiring, I’d love to chat! Connect with me on LinkedIn