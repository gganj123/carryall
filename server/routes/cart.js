const express = require('express');
const cartRouter = express.Router();

const User = mongoose.model('user', new mongoose.Schema({
    name: String,
    cart: [
        {
            productId : Number,
            quantity : Number,
        }
    ],
}));


// POST /cart/:productId
cartRouter.post('/cart', async(req, res) => {
    const { cart } = req.body;

    console.log(cart)
})


// router.post('/', async(req, res, next) => {
//     try {
//         const { email, password, isAdmin } = req.body;

//         const savedUser = await User.create({ email, password, isAdmin });

//         res.status(201).json(utils.buildResponse(savedUser));
//     } catch (error) {
//         next(error);
//     }
// })