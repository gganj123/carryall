const express = require("express");
const app = express();
require("dotenv").config();

const { PORT, PASSWORD } = process.env

const mongoose = require('mongoose')
mongoose.connect(PASSWORD).then(() => console.log('connected')).catch(()=>console.log('failed'))


app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT);
