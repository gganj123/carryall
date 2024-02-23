const express = require("express");
const cors = require('cors');
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

  app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const productsRouter = require('./server/routes/products.js');
app.use("/product", productsRouter); 

const categoriesRouter = require('./server/routes/categories.js');
app.use("/category", categoriesRouter);

// const cartsRouter = require('./server/routes/carts.js');
// app.use("/cart", cartsRouter);


const ordersRouter = require('./server/routes/orders.js');
app.use("/orders", ordersRouter);

const adminsRouter = require('./server/routes/admins.js');
app.use("/admins", adminsRouter);

app.get("/", (req, res) => {
  res.send("접속 성공"); 
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});