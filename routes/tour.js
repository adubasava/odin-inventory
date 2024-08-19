const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripController");

router.get("/", tripController.getTours);

router.get("/new", tripController.newTourForm);

router.post("/new", tripController.creatNewTour);

router.get("/:id", tripController.renderTour);

router.get("/:id/edit", tripController.editTourForm);
router.post("/:id/edit", tripController.editTour);

router.get("/:id/delete", tripController.deleteTour);

module.exports = router;
