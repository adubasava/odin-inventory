const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController");

router.get("/", tripController.browseCategories);

router.get("/new", tripController.newCategoryForm);

router.post("/new", tripController.creatNewCategory);

router.get("/:id", tripController.renderCategory);

router.get("/:id/edit", tripController.editCategoryForm);

router.post("/:id/edit", tripController.editCategory);

router.get("/:id/delete", tripController.deleteCategory);

module.exports = router;
