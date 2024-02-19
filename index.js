const express = require('express');
const app = express();
require('dotenv').config();


app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(process.env.PORT);