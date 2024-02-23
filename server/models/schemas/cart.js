const { Schema } = require("mongoose");

const CartSchema = new Schema(
  {
    // 유저 ID
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        type : {
          // 상품 ID
          productId: String, 
          // 상품 갯수
          quantity: Number,
        },
        required: true,
      }
    ]
  },
  { 
    versionKey: false 
  }
);

module.exports = CartSchema;
