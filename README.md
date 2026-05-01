🛒 GreenCart

GreenCart is a full-stack e-commerce web application built using the MERN Stack. It allows users to browse products, add items to cart, place orders securely using Stripe Payment Gateway, and manage authentication using JWT tokens.

🚀 Live Features
User Registration & Login
Secure Authentication with JWT
Browse Products
Add to Cart / Remove from Cart
Checkout with Stripe
Order Placement
Admin Product Management
Responsive UI
Protected Routes
🛠️ Tech Stack
Frontend
React.js
CSS / Tailwind CSS (if used)
Axios
React Router DOM
Context API / Redux (if used)
Backend
Node.js
Express.js
Database


Added MongoDB Database

Created schemas for:

User
Product
Order
Cart
5️⃣ Implemented Authentication

Used:

bcryptjs for password hashing
JWT for login sessions
Protected private routes
6️⃣ Integrated Stripe Payment

Implemented secure payment flow:

Create checkout session
Redirect to Stripe
Payment success handling
7️⃣ Added Image Upload

Used Cloudinary for storing product images.

8️⃣ Deployment

Deployed frontend and backend for production use.

🔐 Environment Variables

Create .env file inside server:

PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
▶️ Run Locally
Frontend
cd client
npm install
npm run dev
Backend
cd server
npm install
npm run server
📈 Future Improvements
Wishlist
Product Search
Ratings & Reviews
Order Tracking
Email Notifications
Dashboard Analytics
👨‍💻 Author

Gowtham

Aspiring Software Engineer | MERN Stack Developer
MongoDB
Mongoose
Authentication
JSON Web Token (JWT)
bcryptjs
Payment Integration
Stripe
Cloud Storage
Cloudinary (for product images)
