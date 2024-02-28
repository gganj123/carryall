const cartModel = require("../db/models/cartModel");

class CartService {
  constructor(cartModel) {
    this.cartModel = cartModel;
  }

  // 로그인
  async cart(username) {
    let cart = await this.cartModel.findCart(req.session.username);

    if(!cart) {
        cart = "상품이 없습니다."
    }

    return cart;
  }

}

const cartService = new CartService(cartModel);
module.exports = cartService;
