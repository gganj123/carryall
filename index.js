const express = require("express");
const { json, urlencoded } = require("express");
const app = express();
require("dotenv").config();

const { PORT, MONGODB_PASSWORD } = process.env;

const { connect } = require("mongoose");

connect(
    `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`
  )
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

app.use(json());
app.use(urlencoded({ extended: true }));

const productsRouter = require('./server/routes/products.js');
app.use("/product", productsRouter); 


const categoriesRouter = require('./server/routes/categories.js');
app.use("/category", categoriesRouter);

const cartsRouter = require('./server/routes/carts.js');
app.use("/cart", cartsRouter);

app.get("/", (req, res) => {
  res.send("접속 성공"); // res로
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});