const express = require("express");
const cors = require("cors");
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

const indexRouter = require('./server/routes');
app.use('/', indexRouter);
const productsRouter = require("./server/routes/products.js");
app.use("/products", productsRouter);
const categoriesRouter = require("./server/routes/categories.js");
app.use("/categories", categoriesRouter);
const cartsRouter = require("./server/routes/carts.js");
app.use("/carts", cartsRouter);
const ordersRouter = require("./server/routes/orders.js");
app.use("/orders", ordersRouter);
const usersRouter = require('./server/routes/users.js');
app.use("/", usersRouter);

app.get("/", (req, res) => {
  res.send("접속 성공");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
