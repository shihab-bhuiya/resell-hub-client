# ReSell Hub — Second-Hand Marketplace Platform

## Live Project

* **Client:** [Add Live URL]
* **Server:** [Add Backend URL]

## Admin Credentials

* **Email:** [Admin Email]
* **Password:** [Admin Password]

---

## Project Overview

ReSell Hub is a full-stack role-based marketplace platform designed for buying and selling second-hand products securely and efficiently.

The platform connects buyers and sellers in a trusted ecosystem where sellers can list pre-owned products, buyers can discover affordable products, and administrators can monitor platform activity.

The main goal of this platform is to promote sustainable consumption, reduce product waste, and create economic opportunities through product resale.

Inspired by platforms such as [eBay](https://www.ebay.com/?utm_source=chatgpt.com), [OLX](https://www.olx.com/?utm_source=chatgpt.com), and [Facebook Marketplace](https://www.facebook.com/marketplace/?utm_source=chatgpt.com).

---

## Key Features

### Authentication & Security

* Email/password authentication
* Google authentication
* Role-based access control
* Protected private routes
* Secure API authorization
* Environment variable protection

---

### Buyer Features

* Browse marketplace products
* View product details
* Add products to wishlist
* Secure Stripe checkout
* View payment history
* Manage orders
* Update profile

---

### Seller Features

* Seller dashboard
* Add product listings
* Edit/Delete products
* Manage customer orders
* Track revenue
* Sales analytics

---

### Admin Features

* Manage users
* Block/unblock accounts
* Manage products
* Approve/reject listings
* Manage platform orders
* Platform analytics dashboard

---

### Payment System

Integrated secure payments using [Stripe](https://stripe.com/?utm_source=chatgpt.com).

Features:

* Secure card payment
* Payment validation
* Transaction storage
* Order creation after successful payment
* Payment history tracking

---

## Tech Stack

### Frontend

* [Next.js](https://nextjs.org/?utm_source=chatgpt.com)
* React
* Tailwind CSS
* React Hook Form
* Better Auth
* React Hot Toast
* Lucide React

### Backend

* [Node.js](https://nodejs.org/?utm_source=chatgpt.com)
* [Express.js](https://expressjs.com/?utm_source=chatgpt.com)
* JWT Authentication

### Database

* [MongoDB](https://www.mongodb.com/?utm_source=chatgpt.com)

### Payment

* Stripe Checkout

### Deployment

* Vercel (Frontend)
* Render / Railway / VPS (Backend)

---

## Database Collections

* Users
* Products
* Orders
* Payments
* Reviews
* Wishlist

---

## NPM Packages Used

### Frontend

```bash
next
react
tailwindcss
react-hook-form
lucide-react
react-hot-toast
stripe
@stripe/stripe-js
```

### Backend

```bash
express
mongodb
cors
dotenv
jsonwebtoken
stripe
```

---

## Installation

### Clone Client

```bash
git clone <client-repo>
cd client
npm install
npm run dev
```

### Clone Server

```bash
git clone <server-repo>
cd server
npm install
npm run dev
```

---

## Environment Variables

### Client

```env
NEXT_PUBLIC_SERVER_URI=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Server

```env
PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
BETTER_AUTH_SECRET=
```

---

## Architecture

```txt
Client (Next.js)
     ↓
API Layer (Express)
     ↓
MongoDB Database
     ↓
Stripe Payment Gateway
```

---

## Future Improvements

* Product reviews & ratings
* Seller verification badges
* AI-based product recommendation
* Product comparison
* Advanced filtering
* Real-time notifications

---

## Why This Project Stands Out

ReSell Hub demonstrates production-level full-stack engineering concepts:

* Role-based architecture
* Secure payment integration
* Protected APIs
* Dashboard analytics
* Marketplace workflow design
* Real-world CRUD complexity

This project reflects practical skills required for modern frontend and full-stack engineering roles.

Folder Structure
Public
 ├─ Home
 ├─ Browse Products
 └─ Product Details

Seller
 ├─ Overview
 ├─ Add Product
 ├─ My Products
 ├─ Orders
 ├─ Analytics
 └─ Profile

Buyer
 ├─ Overview
 ├─ Orders
 ├─ Wishlist
 ├─ Payments
 └─ Profile

Admin
 ├─ Overview
 ├─ Users
 ├─ Products
 ├─ Orders
 └─ Analytics