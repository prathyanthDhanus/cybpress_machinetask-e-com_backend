const Category = require("../model/categorySchema");
const AppError = require("../../../middlewares/appError");

module.exports = {
  //  ===================== create category =========================

  createCategoryDb: async (categoryData) => {
    const findCategory = await Category.findOne({
      categoryName: categoryData.categoryName,
    });
    if (findCategory) {
      throw new AppError(
        "Category already exists",
        "Field validation error : A category with this category name already exists",
        409
      );
    }
    const saveCategory = new Category({
      ...categoryData,
    });
    await saveCategory.save();
    return saveCategory;
  },

  //  ===================== get all categories =========================

  getAllCategoriesDb: async () => {
    const findAllCategory = await Category.find();
    if (findAllCategory.length === 0) {
      throw new AppError(
        "Categories not found",
        "Data not found : No categories available. Please add some categories.",
        404
      );
    }
    return findAllCategory;
  },

  //  ===================== get category by id =========================

  getCategoryByIdDb: async (categoryId) => {
    const findCategory = await Category.findById(categoryId);

    if (!findCategory) {
      throw new AppError(
        "Category not found",
        "Data not found : Category does not exist",
        404
      );
    }
    return findCategory;
  },

  //  ===================== update category by id =========================

  updateCategoryDb: async (categoryData,image) => {
    const existingCategory = await Category.findById(categoryData.categoryId);
    if (!existingCategory) {
      throw new AppError(
        "Category not found",
        "Data not found : Category does not exist.",
        404
      );
    }

    if (image) {
      categoryData.image = image;
    } else {
      categoryData.image = existingCategory.image;
    }
    const updateCategory = await Category.findByIdAndUpdate(
      categoryData.categoryId,
      categoryData,
      { new: true }
    );
    return updateCategory;
  },

  //  ===================== delete category by id =========================

  deleteCategoryDb: async (categoryId) => {
    const removeCategory = await Category.findByIdAndDelete(categoryId);
    if (!removeCategory) {
      throw new AppError(
        "Category not found",
        "Data not found : Category does not exist.",
        404
      );
    }
    return removeCategory;
  },
};
