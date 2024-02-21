const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

const { PORT, PASSWORD } = process.env
mongoose.connect(PASSWORD).then(() => console.log('connected')).catch(() => console.log('fail'))

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT);
