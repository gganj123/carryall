// 여기 import
const mongoose = require("mongoose");
const ProductSchema = require("./schemas/product");
const CategorySchema = require("./schemas/category");
// 여기 export
exports.Product = mongoose.model("Product", ProductSchema);
exports.Category = mongoose.model("Category", CategorySchema);