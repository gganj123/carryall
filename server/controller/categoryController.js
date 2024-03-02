const CategoryService = require('../service/categoryService');

class CategoryController {
  async getCategory(req, res) {
    try {
      const categories = await CategoryService.getCategoryList();
      res.status(200).json(categories);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  async createCategory(req, res) {
    try {
      const {
        name,
      } = req.body;
      const category = await CategoryService.createCategory({
        name
      });
      res.status(201).json({ success: true, data: category });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  async deleteCategory(req, res) {
    try {
      const { _id } = req.params;
      await CategoryService.deleteCategory(_id);
      res.status(204).json({ success: true, message: "ok" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  async updateCategory(req, res) {
    try {
      const { _id } = req.params;
      const {
        name,
      } = req.body;
      const updatedCategory = await CategoryService.updateCategory({_id}, {
        name,
      });
      res.status(200).json({ success: true, data: updatedCategory });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
const categoryController = new CategoryController();
module.exports = categoryController;
