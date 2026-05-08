<div align="center">

# Code Store — E‑Commerce App

**A full‑stack e‑commerce platform** built with **React (Vite) + TailwindCSS** and a **Node.js + Express + MongoDB** API.

### Live Demo
**Frontend is live on**: [`https://nikkyofficial.vercel.app/`](https://nikkyofficial.vercel.app/)

</div>

---

## ✨ What you get

### 🛍️ Store (Users)
- **Authentication**: signup/login with JWT
- **Product browsing**: search + filters + pagination
- **Product details**: images, pricing, description, colors
- **Cart & checkout**
- **Payments**: Razorpay checkout + server-side verification
- **Orders**: view your order history
- **Reviews**: create/update/delete reviews, view reviews per product

### 🧑‍💼 Admin Dashboard
- Admin login
- **Product management**: create/update/delete products
- **Image uploads**: upload up to **4 product images** (stored on Cloudinary)
- **Moderation**: blacklist/unblacklist products
- **Orders**: view all orders + update order status
- **Analytics**: metrics API for charts and dashboard insights
- **Settings**: change username/password

---

## 🧱 Tech Stack

### Frontend (`client/`)
- React 18 + Vite
- TailwindCSS (+ animations)
- Redux Toolkit
- React Router
- Axios
- Radix UI + Sonner toasts
- Recharts (charts)

### Backend (`server/`)
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt (auth)
- Multer (multipart uploads)
- Cloudinary (image hosting)
- Razorpay (payments)

---

## 📁 Project Structure

```text
Code-Store---Ecommerce-App/
  client/        # React (Vite) frontend
  server/        # Express API
  index.js       # root entry for hosts: loads ./server
  render.yaml    # Render blueprint (API)
```

---

## 🔌 API (Base: `/api`)

> Protected routes require: `Authorization: Bearer <token>`

### Auth
- `POST /api/signup`
- `POST /api/login`
- `POST /api/admin-signup`
- `POST /api/admin-login`

### Products
- `POST /api/create-product` *(admin, multipart: `images` up to 4)*
- `PUT /api/update-product/:id` *(admin)*
- `DELETE /api/delete-product/:id` *(admin)*
- `GET /api/get-products` *(query: `page`, `limit`, `category`, `price`, `search`)*
- `GET /api/get-product-by-name` *(query: `name`)*
- `GET /api/get-product-by-name/:name`
- `PUT /api/blacklist-product/:id` *(admin)*
- `PUT /api/remove-from-blacklist/:id` *(admin)*

### Orders
- `GET /api/get-order-by-user-id` *(auth)*
- `GET /api/get-all-orders` *(admin)*
- `GET /api/get-metrics` *(admin; optional: `startDate`, `endDate`)*
- `PUT /api/update-order-status/:paymentId` *(admin)*

### Payments (Razorpay)
- `POST /api/generate-payment` *(auth)*
- `POST /api/verify-payment` *(auth)*

### Reviews
- `POST /api/create-review` *(auth)*
- `PUT /api/update-review` *(auth)*
- `DELETE /api/delete-review/:id` *(auth)*
- `GET /api/get-reviews/:id`
- `PUT /api/reply-review/:id` *(auth)*

### Settings
- `PUT /api/change-username` *(auth)*
- `PUT /api/change-password` *(auth)*

### Pincode
- `POST /api/add-pincode` *(auth)*
- `GET /api/get-picode/:pincode`

---

## ✅ Environment Variables

Create these locally before running.

### `server/.env`

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## ▶️ Run Locally

### 1) Start backend

```bash
cd server
npm install
npm start
```

API runs on `http://localhost:5000`

### 2) Start frontend

```bash
cd client
npm install
npm run dev
```

App runs on `http://localhost:5173`

---

## 🚀 Deployment Notes

- `render.yaml` is set up to deploy the **API** from `server/` with Node 20.
- Set `CLIENT_URL` on the server to your deployed frontend origin (for CORS).
- Razorpay and Cloudinary require valid keys in the environment.

---

## 🧩 Troubleshooting

- **CORS blocked**: update `CLIENT_URL` in `server/.env` to match your frontend URL exactly.
- **Payment not configured**: ensure `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` exist on the server, and `VITE_RAZORPAY_KEY_ID` exists on the client.
- **Images not uploading**: confirm Cloudinary env vars and that product creation uses `multipart/form-data`.

---

## 📜 License

ISC

