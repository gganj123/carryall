const express = require("express");
const app = express();
require("dotenv").config();

const { PORT, MONGODB_PASSWORD } = process.env

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`).then(() => console.log('connected')).catch(()=>console.log('failed'))


app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
});