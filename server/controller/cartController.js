const cartService = require("../service/cartService");

class CartController {
  constructor(cartModel) {
    this.cartModel = cartModel;
  }

  async findCart(req, res) {
    try {

      const cart = await cartService.cart({usermame : req.session.username});

      res.status(200).json({ message: "장바구니 데이터입니다.", cart });
      
    } catch(error) {
      res.status(500).json({usermame : req.session });
    }
  }

  async editOption(req, res) {
    try {

    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  }
 
  async editQuantity(req, res) {
    try {

    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  }
 
 
}

const cartController = new CartController();
module.exports = cartController;
