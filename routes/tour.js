const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const alphaNumErr =
  "must only contain letters and digits and can not be empty!";
const urlErr = "is not valid URL!";

const validateTour = [
  body("title").trim().isAlphanumeric().withMessage(`Tour name ${alphaNumErr}`),
  body("location").optional().trim(),
  body("description").optional().trim(),
  body("imageurl")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage(`Tour URL ${urlErr}`),
];

const tripController = require("../controllers/tripController");

router.get("/", tripController.getTours);

router.get("/new", tripController.newTourForm);

router.post("/new", [validateTour], tripController.creatNewTour);

router.get("/:id", tripController.renderTour);

router.get("/:id/edit", tripController.editTourForm);

router.post("/:id/edit", [validateTour], tripController.editTour);

router.get("/:id/delete", tripController.deleteTourForm);

router.post("/:id/delete", tripController.deleteTour);

module.exports = router;
