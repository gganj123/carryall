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
const productsRouter = require("./server/routes/productrouter.js");
const categoriesRouter = require("./server/routes/categoryRouter.js");
const cartsRouter = require("./server/routes/carts.js");
const ordersRouter = require("./server/routes/orders.js");
const usersRouter = require("./server/routes/usersRouter.js");
const viewRouter = require("./server/routes/viewRouter.js");
const adminRouter = require("./server/routes/admins.js");



app.use(express.static('client'));
app.use(viewRouter);

app.use('/api', indexRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api", usersRouter);
app.use("/api/admins", adminRouter);

app.use(errorHandler);

app.get("/",(req, res)=> {
  res.send("접속 성공");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});