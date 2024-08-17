const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController");

router.get("/", tripController.browseCategories);

router.get("/new", tripController.newCategoryForm);

router.post("/new", tripController.creatNewCategory);

router.get("/:id", tripController.renderCategory);

module.exports = router;
