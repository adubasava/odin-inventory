if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

const indexRouter = require("./routes/index");
const categoryRouter = require("./routes/category");
const tourRouter = require("./routes/tour");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/categories", categoryRouter);
app.use("/tours", tourRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

module.exports = app;
