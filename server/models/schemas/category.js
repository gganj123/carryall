import { Schema } from "mongoose";
import shortId from "./types/short-id.js";

const ProductSchema = new Schema({
  categoryId: {
    default: "category" + shortId,
  },
  categoryName: {
    type: String,
    required: true,
  },
});

export default ProductSchema;
