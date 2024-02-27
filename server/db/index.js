const { model } = require("mongoose");
const ProductSchema = require("./schemas/product");
const CartSchema = require("./schemas/cart");
const UserSchema = require("./schemas/user");
const UserNotificationSchema = require("./schemas/userNotification");
const AddressSchema = require("./schemas/address");
const OrderSchema = require('./schemas/order')
const AdminSchema = require('./schemas/admin');

const Product = model("Product", ProductSchema);
const Cart = model("Cart", CartSchema);
const User = model("User", UserSchema);
const UserNotification = model("UserNotification", UserNotificationSchema);
const Address = model("Address", AddressSchema);
const Order = model("Order", OrderSchema);
const Admin = model("Admin", AdminSchema);


module.exports = { Product, Cart, User, UserNotification, Address, Order , Admin };


