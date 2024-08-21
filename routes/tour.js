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

const tourController = require("../controllers/tourController");

router.get("/", tourController.getTours);

router.get("/new", tourController.newTourForm);

router.post("/new", [validateTour], tourController.creatNewTour);

router.get("/:id", tourController.renderTour);

router.get("/:id/edit", tourController.editTourForm);

router.post("/:id/edit", [validateTour], tourController.editTour);

router.get("/:id/delete", tourController.deleteTourForm);

router.post("/:id/delete", tourController.deleteTour);

module.exports = router;
