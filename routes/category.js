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

const tripController = require("../controllers/tripController");

router.get("/", tripController.browseCategories);

router.get("/new", tripController.newCategoryForm);

router.post("/new", [validateCategory], tripController.creatNewCategory);

router.get("/:id", tripController.renderCategory);

router.get("/:id/edit", tripController.editCategoryForm);

router.post("/:id/edit", [validateCategory], tripController.editCategory);

router.get("/:id/delete", tripController.deleteCategory);

module.exports = router;
