const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("express");
const app = express();
require("dotenv").config();
const { PORT, MONGODB_PASSWORD } = process.env;
const { connect } = require("mongoose");

const indexRouter = require("./server/routes"); 
const productsRouter = require("./server/routes/product-router.js");
const categoriesRouter = require("./server/routes/category-router.js");
const cartsRouter = require("./server/routes/carts.js");
const ordersRouter = require("./server/routes/orders.js");
const usersRouter = require("./server/routes/users.js");
const adminRequired = require("./server/middlewares/admin_required");
const errorHandler = require("./server/middlewares/error-handler");

connect(
  `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`
)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);
app.use("/", usersRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("접속 성공");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
