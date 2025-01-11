const {
  createCategoryDb,
  getAllCategoriesDb,
  getCategoryByIdDb,
  updateCategoryDb,
  deleteCategoryDb,
} = require("./services/db");

module.exports = {
  //  ===================== create category =========================

  createCategory: async (req, res) => {
    const { categoryName, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!categoryName || !description || !image) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }
    const categoryData = { categoryName, description, image };
    const saveCategory = await createCategoryDb(categoryData);
    return res.status(201).json({
      status: "success",
      message: "Category created successfully ",
      data: saveCategory,
    });
  },

  //  ===================== get all categories =========================

  getAllCategories: async (req, res) => {
    const fetchCategories = await getAllCategoriesDb();
    return res.status(200).json({
      status: "success",
      message: "Successfully fetched all categories",
      data: fetchCategories,
    });
  },

  //  ===================== get category by id =========================

  getCategoryById: async (req, res) => {
    const categoryId = req.params.categoryId;

    const fetchCategory = await getCategoryByIdDb(categoryId);
    return res.status(200).json({
      status: "success",
      message: "Successfully fetched category",
      data: fetchCategory,
    });
  },

  //  ===================== update category by id =========================

  updateCategory: async (req, res) => {
    const categoryId = req.params.categoryId;
    const { categoryName, description } = req.body;
    let image = req.file ? req.file.path : null;
   
    if (!categoryName || !description || !image) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }
    const categoryData = { categoryName, description, categoryId };
    const updateCategory = await updateCategoryDb(categoryData,image);
    return res.status(201).json({
      status: "success",
      message: "Category updated successfully ",
      data: updateCategory,
    });
  },

  //  ===================== delete category by id =========================

  deleteCategory: async (req, res) => {
    const categoryId = req.params.categoryId;

    const removeCategory = await deleteCategoryDb(categoryId);
    return res.status(200).json({
      status: "success",
      message: "Category deleted successfully ",
      data: removeCategory,
    });
  },
};
