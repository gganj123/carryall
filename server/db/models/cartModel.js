const mongoose = require("mongoose");
const CartSchema = require("../schemas/cart");
const { User } = require("..");

const Cart = mongoose.model("carts", CartSchema);

class CartModel {
  // 장바구니 찾기
  async findCart(username) {
    const cart = await Cart.findOne({ username });
    return cart;
  }

  // 장바구니 상품 담기
  async addToCart(username, productId, quantity) {
    let cart = await Cart.findOne({ username });

    if (!cart) {
      cart = await Cart.create({
        username,
        products: [{ productId, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (product) => product.productId == productId
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }
    }

    await cart.save();
    return cart;
  }

  // 장바구니 상품 옵션변경
  async editOption(username, update) {
    const { productId, option } = update;
    const cart = await Cart.findOne({ username });

    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );

    cart.products[productIndex].option = option;

    await cart.save();
    return cart;

  }

  // 장바구니 상품 옵션변경
  async editQuantity(username, update) {
    const { productId, quantity } = update;
    const cart = await Cart.findOne({ username });

    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );

    cart.products[productIndex].quantity = quantity;

    await cart.save();
    return cart;
  }

  // 선택상품 삭제
  async checkDelete() {

  }

  // 전체상품 삭제
  async allDelete() {
    
  }
}

const cartmodel = new CartModel();

module.exports = cartmodel;
