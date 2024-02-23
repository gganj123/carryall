
const { model } = require("mongoose");
const ProductSchema = require("./schemas/product");
const CategorySchema = require("./schemas/category");
const CartSchema = require("./schemas/cart");
const UserSchema = require("./schemas/user");
const AddressSchema = require("./schemas/address");
const OrderSchema = require('./schemas/order')

const Product = model("Product", ProductSchema);
const Category = model("Category", CategorySchema);
const Cart = model("Cart", CartSchema);
const User = model("User", UserSchema);
const Address = model("Address", AddressSchema);
const Order = model("Order", OrderSchema);


module.exports = { Product, Category, Cart, User, Address, Order };


