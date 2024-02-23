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
app.use("/products", productsRouter); 
const categoriesRouter = require('./server/routes/categories.js');
app.use("/categories", categoriesRouter);

app.get("/", (req, res) => {
<<<<<<< HEAD
  res.send('asdasd');
=======
  console.log("접속 성공");
>>>>>>> e7e96d40e0c2068c7314f9bce0fce09a12063fda
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
<<<<<<< HEAD

=======
>>>>>>> e7e96d40e0c2068c7314f9bce0fce09a12063fda
