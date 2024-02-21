// 여기 import
import { model } from "mongoose";
import ProductSchema from "./schemas/product";
import CategorySchema from "./schemas/category";
export const Product = model("Product", ProductSchema);
export const Category = model("Category", CategorySchema);
