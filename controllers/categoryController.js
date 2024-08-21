const db = require("../db/queries");
const { validationResult } = require("express-validator");

require("dotenv").config();

async function getTrendingCategories(req, res) {
  try {
    const categories = await db.getCategoriesWithTours();
    const tours = await db.getRecentTours();
    res.render("index", { categories: categories, tours: tours });
  } catch {
    res.redirect("/");
  }
}

async function browseCategories(req, res) {
  try {
    const categories = await db.getCategoriesWithTourNumber();
    res.render("categories/index", { categories: categories });
  } catch {
    res.redirect("/");
  }
}

async function newCategoryForm(req, res) {
  try {
    res.render("categories/new");
  } catch {
    res.redirect("/categories");
  }
}

async function creatNewCategory(req, res) {
  const errors = validationResult(req);
  const categoryName = req.body.name;
  if (!errors.isEmpty()) {
    return res.render("categories/new", {
      name: categoryName,
      errorMessage: errors.mapped()["name"].msg,
    });
  }
  try {
    await db.addCategory(categoryName);
    res.redirect("/");
  } catch {
    res.render("categories/new", {
      name: categoryName,
      errorMessage: "Error creating Category. Category names must be unique!",
    });
  }
}

async function renderCategory(req, res) {
  const categoryName = req.params.id;
  try {
    const category = await db.getCategoryByName(categoryName);
    const tours = await db.getTourByCategory(categoryName);
    res.render("categories/category", {
      category: category,
      tours: tours,
    });
  } catch {
    res.redirect("/");
  }
}

async function editCategoryForm(req, res) {
  try {
    const name = req.params.id;
    res.render("categories/edit", { name: name });
  } catch {
    res.redirect("/categories");
  }
}

async function editCategory(req, res) {
  const oldName = req.params.id;
  const { name, password } = req.body;
  if (password !== process.env.PSSWD) {
    return res.render("categories/edit", {
      name: oldName,
      errorMessage: "Wrong password!",
    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("categories/edit", {
      name: oldName,
      errorMessage: errors.mapped()["name"].msg,
    });
  }
  try {
    if (name !== oldName) {
      await db.updateCategory(name, oldName);
    }
    res.redirect("/");
  } catch {
    res.render("categories/edit", {
      name: oldName,
      errorMessage: "Error editing Category",
    });
  }
}

async function deleteCategoryForm(req, res) {
  try {
    const name = req.params.id;
    res.render("categories/delete", { name: name });
  } catch {
    res.redirect("/categories");
  }
}

async function deleteCategory(req, res) {
  const categoryName = req.params.id;
  const { password } = req.body;
  if (password !== process.env.PSSWD) {
    return res.render("categories/delete", {
      name: categoryName,
      errorMessage: "Wrong password!",
    });
  }
  const tours = await db.getTourByCategory(categoryName);
  const categories = await db.getCategoriesWithTourNumber();
  if (tours.length > 0) {
    res.render("categories/index", {
      categories: categories,
      errorMessage: "Cannot delete non-empty category. Delete tours before",
    });
  } else if (tours.length === 0) {
    try {
      await db.removeCategory(categoryName);
      res.redirect("/");
    } catch {
      res.render("categories/index", {
        categories: categories,
        errorMessage: "Error deliting Category",
      });
    }
  }
}

module.exports = {
  getTrendingCategories,
  browseCategories,
  newCategoryForm,
  creatNewCategory,
  renderCategory,
  editCategoryForm,
  editCategory,
  deleteCategoryForm,
  deleteCategory,
};
