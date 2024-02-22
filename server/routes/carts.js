const { Router } = require("express");
const Cart = require("../models").Cart;
const User = require("../models").User;
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

router.get('/:userId', async(req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await User.findOne({ id:userId });
    const carts = foundUser ? foundUser.cart : null;

    res.json(carts);

  } catch(err) {
    console.error(err);
  }
})




module.exports = router;