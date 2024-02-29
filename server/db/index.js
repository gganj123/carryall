const { model } = require("mongoose");
const ProductSchema = require("./schemas/product");
const UserSchema = require("./schemas/user");
const OrderSchema = require('./schemas/order')
// const AdminSchema = require('./schemas/admin');

const Product = model("Product", ProductSchema);
const User = model("User", UserSchema);
const Order = model("Order", OrderSchema);
// const Admin = model("Admin", AdminSchema);


module.exports = { Product, User, Order };


