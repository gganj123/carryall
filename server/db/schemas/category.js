const { Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      default:"원산지"
    },
    detail: {
      type: String,
      default:"디테일"
    },
  },
  {
    versionKey: false,
  }
);

module.exports = CategorySchema;