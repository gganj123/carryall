const express = require('express');
const cartRouter = express.Router();




cartRouter.post('/cart', async(req, res) => {
    const { cart } = req.body;

    console.log(cart)
})
