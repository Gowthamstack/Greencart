import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/userRouter.js";
import cors from 'cors'
import connectDB from "./Config/db.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./Config/cloudinary.js";
import productRouter from "./routes/ProductRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebHooks } from "./controllers/orderController.js";

const PORT = 8080;

await connectDB();
await connectCloudinary();

app.post('/stripe',express.raw({type:'/application/json'}),stripeWebHooks);

const allowedOrgins=['http://localhost:5173']

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({origin:allowedOrgins,credentials:true}));




app.get("/",(req, res) => {
  res.send("API Hello Express");
});


app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter )
app.use("/api/addres",addressRouter )
app.use("/api/order",orderRouter )


app.listen(PORT, () => {
  console.log(process.env.SELLER_EMAIL);
  console.log(process.env.SELLER_PASSWORD);
  console.log(`Server Running in http://localhost:${PORT}`);
  console.log(`Ctrl+c to EXIT!!!.....`);
});
