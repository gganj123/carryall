// 여기 import
const { model } = require("mongoose");
const ProductSchema = require("./schemas/product");
const CategorySchema = require("./schemas/category");
const CartSchema = require("./schemas/cart");
const AddressSchema = require("./schemas/address");
const Product = model("Product", ProductSchema);
const Category = model("Category", CategorySchema);
const Cart = model("Cart", CartSchema);
const Address = model("Address", AddressSchema);

module.exports = { Product, Category, Cart, Address };