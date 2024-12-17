const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Default item route
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/reviews", reviewRouter);

module.exports = app;
