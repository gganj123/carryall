// 여기 import
const mongoose = require("mongoose");
const ProductSchema = require("./schemas/product");

// 여기 export
exports.Product = mongoose.model("Product", ProductSchema);
