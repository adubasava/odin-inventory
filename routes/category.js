const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const alphaNumErr =
  "must only contain letters and digits and can not be empty!";

const validateCategory = [
  body("name")
    .trim()
    .isAlphanumeric()
    .withMessage(`Category name ${alphaNumErr}`),
];

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.browseCategories);

router.get("/new", categoryController.newCategoryForm);

router.post("/new", [validateCategory], categoryController.creatNewCategory);

router.get("/:id", categoryController.renderCategory);

router.get("/:id/edit", categoryController.editCategoryForm);

router.post("/:id/edit", [validateCategory], categoryController.editCategory);

router.get("/:id/delete", categoryController.deleteCategoryForm);

router.post("/:id/delete", categoryController.deleteCategory);

module.exports = router;
