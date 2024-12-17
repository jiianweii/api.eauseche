const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env",
});

mongoose.connect(process.env.DATABASE).then(() => console.log("DB CONNECTED"));

// const testProduct = new Product({
//   name: "Longetivity T shirt",
//   price: 199.9,
//   colours: ["Grey", "Green", "Red", "Blue", "Orange"],
//   size: ["M", "L", "XL"],
//   description: "Don't buy if you're poor lol",
//   image: "male-t-shirt-1.jpg",
//   gender: "Men",
//   ageGroup: "Adult",
//   type: "T-Shirt",
//   maxQuantity: 1,
// });

// // testProduct
// //   .save()
// //   .then((doc) => console.log(doc))
// //   .catch((err) => console.log(err));

const app = require("./app");
const Product = require("./models/productModel");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running");
});
