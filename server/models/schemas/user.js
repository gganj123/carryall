const { Schema } = require("mongoose");

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  cart: [{
    productId : {
        type: String,
    },
    quantity : {
        type: Number,
    }
  }], 
});

module.exports = UserSchema;



