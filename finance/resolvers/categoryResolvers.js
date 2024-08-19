const Category = require('../models/Category');

const categoryResolvers = {
  createCategory: async ({ userId, name, color }) => {
    const category = new Category({ userId, name, color });
    return await category.save();
  },
  updateCategory: async ({ id, name, color }) => {
    return await Category.findByIdAndUpdate(id, { name, color }, { new: true });
  },
  deleteCategory: async ({ id }) => {
    return await Category.findByIdAndDelete(id);
  },
};

module.exports = categoryResolvers;
