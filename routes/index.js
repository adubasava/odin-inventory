const express = require("express");
const router = express.Router();

const tripController = require("../controllers/categoryController");

router.get("/", tripController.getTrendingCategories);

module.exports = router;
