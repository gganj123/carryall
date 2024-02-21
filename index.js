const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();
mongoose.connect('mongodb+srv://twincornjr:uo6hMfF6UP3xWxNJ@cluster0.tj5uf36.mongodb.net/').then(() => console.log('connected')).catch(() => console.log('fail'))

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(process.env.PORT);
