const { Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = CategorySchema;