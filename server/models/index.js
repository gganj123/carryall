// 여기 import
const { model } = require("mongoose");
const ProductSchema = require("./schemas/product");
const CategorySchema = require("./schemas/category");


const Product = model("Product", ProductSchema);
const Category = model("Category", CategorySchema);


module.exports = { Product, Category };