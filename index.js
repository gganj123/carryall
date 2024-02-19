const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('GET /users');
});

app.post('/', (req, res) => {
    res.send('POST /users');
});

app.put('/', (req, res) => {
    res.send('PUT /users');
});

app.delete('/', (req, res) => {
    res.send('DELETE /users');
});


app.listen(process.env.PORT);