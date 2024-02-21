const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(); // 몽고디비 주소

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(process.env.PORT);