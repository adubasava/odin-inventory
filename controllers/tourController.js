const db = require("../db/queries");
const { validationResult } = require("express-validator");
const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

require("dotenv").config();

async function getTours(req, res) {
  try {
    const tours = await db.getAllTours();
    res.render("tours/index", { tours: tours });
  } catch {
    res.redirect("/");
  }
}

async function newTourForm(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("tours/new", { categories: categories });
  } catch {
    res.redirect("/tours");
  }
}

async function creatNewTour(req, res) {
  const errors = myValidationResult(req).array();
  const categories = await db.getAllCategories();
  if (errors.length > 0) {
    return res.render("tours/new", {
      categories: categories,
      errorMessage: errors.join(" "),
    });
  }
  const { title, description, location, imageurl, categoryId } = req.body;
  try {
    await db.addTour(title, description, location, imageurl, categoryId);
    res.redirect("/tours");
  } catch {
    res.render("tours/new", {
      errorMessage: "Error creating Tour",
    });
  }
}

async function renderTour(req, res) {
  const tourId = req.params.id;
  try {
    const tour = await db.getTourById(tourId);
    if (tour.length > 0) {
      res.render("tours/tour", {
        tour: tour,
      });
    } else {
      res.redirect("/tours");
    }
  } catch {
    res.redirect("/tours");
  }
}

async function editTourForm(req, res) {
  const tourId = req.params.id;
  try {
    const categories = await db.getAllCategories();
    const tour = await db.getTourById(tourId);
    res.render("tours/edit", {
      categories: categories,
      tour: tour,
    });
  } catch {
    res.redirect("/tours");
  }
}

async function editTour(req, res) {
  const tourId = req.params.id;
  const tour = await db.getTourById(tourId);
  const categories = await db.getAllCategories();
  const { title, description, location, imageurl, categoryId, password } =
    req.body;
  if (password !== process.env.PSSWD) {
    return res.render("tours/edit", {
      tour: tour,
      categories: categories,
      errorMessage: "Wrong password!",
    });
  }
  const errors = myValidationResult(req).array();
  if (errors.length > 0) {
    return res.render("tours/edit", {
      tour: tour,
      categories: categories,
      errorMessage: errors.join(" "),
    });
  }
  try {
    await db.updateTour(
      title,
      description,
      location,
      imageurl,
      categoryId,
      tourId,
    );
    res.redirect("/tours");
  } catch {
    res.render("tours/edit", {
      errorMessage: "Error editing Tour",
    });
  }
}

async function deleteTourForm(req, res) {
  const tourId = req.params.id;
  try {
    res.render("tours/delete", { id: tourId });
  } catch {
    res.redirect("/tours");
  }
}

async function deleteTour(req, res) {
  const tourId = req.params.id;
  const { password } = req.body;
  if (password !== process.env.PSSWD) {
    return res.render("tours/delete", {
      id: tourId,
      errorMessage: "Wrong password!",
    });
  }
  const tours = await db.getAllTours();
  try {
    await db.removeTour(tourId);
    res.redirect("/");
  } catch {
    res.render("tours/index", {
      tours: tours,
      errorMessage: "Error deliting Tour",
    });
  }
}

module.exports = {
  getTours,
  renderTour,
  newTourForm,
  creatNewTour,
  editTourForm,
  editTour,
  deleteTourForm,
  deleteTour,
};
