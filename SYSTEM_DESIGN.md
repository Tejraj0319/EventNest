# EventNest System Design

## Overview

EventNest is a scalable event booking ecosystem designed with separate dashboards for Users, Organizers, and Admins.

The platform follows a modular full-stack architecture using React.js, Node.js, Prisma ORM, and MySQL.

---

# High-Level Architecture

```bash
Client Applications
│
├── Public Dashboard
├── Organizer Dashboard
└── Admin Dashboard
        │
        ↓
REST API Layer (Express.js)
        ↓
Business Logic Layer
        ↓
Prisma ORM
        ↓
MySQL Database
```

---

# Authentication Flow

```bash
User Login
   ↓
JWT Token Generation
   ↓
Protected Middleware
   ↓
Role Verification (RBAC)
   ↓
Authorized Route Access
```

---

# Booking Workflow

```bash
Select Event
    ↓
Create Pending Booking
    ↓
Razorpay Payment
    ↓
Payment Verification
    ↓
Prisma Transaction
    ↓
Seat Deduction
    ↓
QR Ticket Generation
    ↓
Email Ticket Delivery
```

---

# Overbooking Prevention Strategy

To prevent race conditions during high-concurrency booking requests:

- Prisma transactions were used for atomic operations
- Seat deduction occurs only after successful payment verification
- Booking creation and seat updates are executed inside transactional workflows

This ensures consistency and prevents duplicate seat allocation.

---

# Role-Based Access Control (RBAC)

The platform supports multiple roles:

- USER
- ORGANIZER
- ADMIN

Middleware-based authorization ensures route-level access isolation.

---

# Automation System

Cron jobs are used to:

- Detect expired unpaid bookings
- Restore reserved seats automatically
- Maintain booking lifecycle consistency

---

# Scalability Considerations

- Modular backend architecture
- Separate dashboard systems
- Reusable middleware structure
- Organized API layers
- Optimized Redux state management

---

# Integrations

- Razorpay (Payments)
- Cloudinary (Image Uploads)
- Nodemailer (Emails)
- QR Code Generator
- PDF Ticket Generator

---

# Future Improvements

- WebSocket live seat updates
- Redis caching
- Queue-based email processing
- Docker deployment
- CI/CD pipeline