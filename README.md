# ReSell Hub — Second-Hand Marketplace Platform

## Live Website

**Live Site:** (https://resell-hub-client-mu.vercel.app)

## Repositories

**Client Repository:** *(Add client GitHub URL)*
**Server Repository:** *(Add server GitHub URL)*

---

# Project Overview

ReSell Hub is a full-stack second-hand marketplace platform where users can safely buy and sell pre-owned products. The platform aims to reduce waste, encourage sustainable consumption, and create earning opportunities for sellers by helping them sell unused products.

Buyers can browse products, add items to wishlist, complete secure payments, and track order history. Sellers can manage product listings and incoming orders. Admins have complete control over users, products, orders, and analytics.

This project was built to simulate a production-level marketplace system with role-based dashboards, secure payments, product moderation, and scalable backend architecture.

---

# Project Purpose

The main goal of ReSell Hub is to solve real-world marketplace problems:

* Reduce reusable product waste
* Promote sustainable shopping
* Enable affordable purchasing
* Help users earn from unused products
* Build a secure multi-role marketplace platform

---

# Key Features

## Public Features

* Modern responsive marketplace UI
* Browse all approved products
* Product details page
* Category-based product filtering
* Search products by title/category
* Advanced sorting (price & alphabetical)
* Responsive navbar and footer
* Animated homepage sections using Framer Motion

---

## Authentication

* Email/password authentication using Better Auth
* Google authentication
* Persistent login sessions
* Role-based dashboard access

> JWT protected APIs are currently being integrated as the final security enhancement.

---

# Buyer Dashboard

Buyers can:

* View dashboard overview
* Purchase products
* Save items to wishlist
* View payment history
* Track orders
* View payment success page
* Manage profile

### Buyer Overview Includes

* Total Orders
* Wishlist Count
* Recent Purchases

---

# Seller Dashboard

Sellers can:

* Add new products
* Manage listed products
* Edit/Delete products
* View sales overview
* Manage incoming orders
* Track pending orders
* View revenue analytics

### Seller Overview Includes

* Total Products
* Total Sales
* Total Revenue
* Pending Orders

---

# Admin Dashboard

Admins have full platform control.

Admin can:

* Manage users
* Block/Unblock users
* Delete users
* Approve products
* Reject products
* Delete products
* Manage orders
* Monitor platform analytics

---

# Product Approval System

ReSell Hub includes an admin moderation workflow.

### Workflow

Seller adds product
→ Product status becomes **pending**
→ Admin reviews product
→ Admin approves/rejects product
→ Only approved products become public

This ensures marketplace quality and prevents suspicious listings.

---

# Payment System

Integrated with **Stripe** for secure checkout.

### Payment Workflow

Buyer selects product
→ Checkout session created
→ Secure Stripe payment
→ Payment success page
→ Order created
→ Payment stored in database

### Stored Payment Data

* Transaction ID
* Buyer ID
* Product ID
* Payment Amount
* Payment Status
* Payment Method
* Payment Date

Payment statuses:

* Pending
* Paid
* Failed

---

# Homepage Sections

* Hero Banner
* Featured Products
* Popular Categories
* Success Stories
* Marketplace Statistics
* Sustainability Impact
* Trusted Sellers Showcase

---

# Database Collections

## Users

Stores:

* User profile
* Role
* Account status
* Contact info

## Products

Stores:

* Product details
* Price
* Category
* Seller information
* Approval status

## Orders

Stores:

* Buyer info
* Seller info
* Product reference
* Order status

## Payments

Stores:

* Transaction details
* Payment status
* Payment amount
* Payment timestamps

## Wishlist

Stores buyer saved products.

---

# Admin Analytics

Platform analytics include:

* Total Users
* Total Products
* Total Orders
* Revenue Insights
* User Growth
* Category Performance

---

# Tech Stack

## Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS
* Framer Motion
* Lucide React
* React Hot Toast

## Backend

* Node.js
* Express.js
* REST API Architecture

## Database

* MongoDB

## Authentication & Payment

* Better Auth
* Stripe

---

# NPM Packages Used

## Frontend

```bash
next
react
tailwindcss
framer-motion
lucide-react
react-hot-toast
```

## Backend

```bash
express
cors
dotenv
mongodb
stripe
```

---

# Challenges Faced

During development, several engineering challenges were solved:

* Stripe payment session handling
* Order creation after payment success
* Product approval workflow
* Role-based dashboard architecture
* Buyer/seller/admin separation
* Dynamic analytics generation

These challenges improved full-stack architecture and debugging skills.

---

# Future Improvements

Planned enhancements:

* JWT protected APIs
* Role-based middleware authorization
* Pagination
* Product comparison feature
* Dark/light mode
* Seller verification badge
* Product reporting system
* Advanced filtering

---

# Security

Sensitive credentials are stored using environment variables:

* Better Auth keys
* MongoDB URI
* Stripe keys
* JWT Secret (planned)

Security practices:

* Protected private routes
* Hidden environment credentials
* Secure payment flow
* Role-based access control

---

# Developer

**Shihab Bhuiya**
Full Stack Developer (Learning & Building)

Focused on:

* Full-stack web development
* Problem solving
* Clean architecture
* Scalable backend systems

---

# Final Notes

ReSell Hub is more than an academic assignment. It demonstrates real-world marketplace engineering concepts including authentication, payments, product moderation, role-based dashboards, analytics, and scalable database design.

This project reflects my growth in full-stack development and my ability to design complete production-style systems.
