const { Schema } = require("mongoose");
const shortId= require('./types/short-id');

const CategorySchema = new Schema({
  _id: shortId,
  name: {
    type: String,
    required: true,
  }
},
  {
    versionKey: false
  }
);

module.exports = CategorySchema;
