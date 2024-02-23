const { Schema } = require("mongoose");

const CartSchema = new Schema({
  // 유저 ID
  userId: {
    type:String,
    required: true,
  },
  // 상품 ID
  productId: {
    type: String,
    required: true,
  },
  // 상품 갯수
  quantity: {
    type: Number,
    required: true,
  }, 
});

module.exports = CartSchema;



