import express, { json, urlencoded } from "express";
const app = express();
require("dotenv").config();

const { PORT, MONGODB_PASSWORD } = process.env;

import { connect } from "mongoose";

connect(
    `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`
  )
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

app.use(json());
app.use(urlencoded({ extended: true }));

import productsRouter from "./server/routes/products";
app.use("/products", productsRouter); // 중간에 관리자인지 확인할 필요 있음
import categoriesRouter from "./server/routes/categories";
app.use("/categories", categoriesRouter);

app.get("/", (req, res) => {
  console.log("접속 성공");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
