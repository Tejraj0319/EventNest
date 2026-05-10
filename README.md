#  EventNest — Full Stack Event Booking Platform

EventNest is a scalable full-stack event booking ecosystem built using the MERN stack, Prisma ORM, and MySQL.

The platform includes:
- Public User Dashboard
- Organizer Dashboard
- Admin Dashboard
- Secure Backend APIs

It supports real-time seat booking workflows, Razorpay payment integration, QR ticket generation, role-based access control, and automated booking management.

---

#  Live Projects

## Public Dashboard
https://event-nest-six.vercel.app/login

## Organizer Dashboard
https://event-nest-organizer.vercel.app/

## Admin Dashboard
https://event-nest-admin.vercel.app/

## Backend API
https://eventnest-backend-x2tj.onrender.com

---

#  Tech Stack

## Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router

## Backend
- Node.js
- Express.js
- Prisma ORM

## Database
- MySQL

## Authentication & Security
- JWT Authentication
- Role-Based Access Control (RBAC)
- Joi Validation

## Integrations
- Razorpay
- Cloudinary
- Nodemailer

---

#  Core Features

##  Authentication & Security
- JWT-based authentication
- Role-based access system
- Protected routes & middleware
- Organizer/Admin authorization

##  Booking Engine
- Atomic seat deduction using Prisma transactions
- Overbooking prevention logic
- Booking cancellation with seat restoration
- Booking status lifecycle management

##  Payment Integration
- Razorpay payment gateway
- Payment verification
- Webhook handling
- Failed payment recovery

##  Ticketing System
- QR code generation
- PDF ticket generation
- Ticket email delivery
- Automated confirmation flow

##  Organizer Dashboard
- Event CRUD operations
- Revenue analytics
- Booking insights
- Seat occupancy tracking

##  Admin Dashboard
- User management
- Block/unblock users
- Role management
- Booking & event monitoring

##  Automation
- Cron-based expired booking cleanup
- Automatic seat restoration
- Email notifications

---

#  Engineering Challenges Solved

### Prevented Overbooking
Implemented Prisma transaction-based booking flow to ensure concurrency-safe seat deduction during high traffic booking operations.

### Automated Booking Recovery
Built cron-based cleanup jobs to automatically expire unpaid bookings and restore seat availability.

### Secure Role Isolation
Implemented RBAC middleware architecture to isolate USER, ORGANIZER, and ADMIN workflows securely.

### Reliable Payment Confirmation
Integrated Razorpay webhook verification to handle asynchronous payment confirmation safely.

---

#  Performance & Optimization

- Optimized dashboard rendering with Redux Toolkit
- Structured scalable API architecture
- Reduced manual booking management through automation
- Improved application performance and SEO optimization

---

#  Project Architecture

```bash
Frontend (React.js)
        ↓
Backend API (Node.js + Express)
        ↓
Prisma ORM
        ↓
MySQL Database
```

---

#  Key Highlights

- Multi-dashboard ecosystem
- Production-style backend architecture
- Real-time booking workflows
- Payment + ticket automation
- Scalable role-based system

---

#  Author

Rajesh Patil

GitHub:
https://github.com/Tejraj0319
