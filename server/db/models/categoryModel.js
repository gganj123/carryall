const mongoose = require("mongoose");
const CategorySchema = require("../schemas/category");
const Category = mongoose.model("Category", CategorySchema);

class CategoryModel {
  async create(categoryInfo) {
    const createNewCategory = await Category.create(categoryInfo);
    return createNewCategory;
  }
  async find() {
    const categories = await Category.find({});
    return categories;
  }
  async update({ _id }, { name }) {
    const option = { returnOriginal: false };
    const updatedCategory = await Category.findOneAndUpdate({ _id }, { name }, option);
    return updatedCategory;
  }
  async delete(_id) {
    const result = await Category.deleteOne({ _id});
    return result;
  }
}

const categoryModel = new CategoryModel();
module.exports = categoryModel;