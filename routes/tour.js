const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController");

router.get("/", tripController.getTours);

router.get("/new", tripController.newTourForm);

router.post("/new", tripController.creatNewTour);

router.get("/:id", tripController.renderTour);

module.exports = router;
