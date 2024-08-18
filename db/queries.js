const pool = require("./pool");

// --- CATEGORIES ---

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategoryByName(categoryName) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE name = $1",
    [categoryName],
  );
  return rows;
}

async function addCategory(name) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
}

async function updateCategory(newName, oldName) {
  await pool.query("UPDATE categories SET name = ($1) WHERE name = ($2)", [
    newName,
    oldName,
  ]);
}

async function removeCategory(categoryName) {
  await pool.query("DELETE FROM categories WHERE name = ($1)", [categoryName]);
}

// --- TOURS ---

async function getAllTours() {
  const { rows } = await pool.query(
    "SELECT tours.id, title, description, location, image, name FROM tours INNER JOIN categories ON category_id=categories.id;",
  );
  return rows;
}

async function getTourById(tourId) {
  const { rows } = await pool.query(
    "SELECT tours.id, title, description, location, image, name FROM tours INNER JOIN categories ON category_id=categories.id WHERE tours.id = $1",
    [tourId],
  );
  console.log(rows);
  return rows;
}

async function getTourByCategory(categoryName) {
  const { rows } = await pool.query(
    "SELECT title, description, location, image, name FROM tours INNER JOIN categories ON category_id=categories.id WHERE name = $1",
    [categoryName],
  );
  return rows;
}

async function addTour(title, description, location, image, categoryId) {
  await pool.query(
    "INSERT INTO tours (title, description, location, image, category_id) VALUES ($1, $2, $3, $4, $5)",
    [title, description, location, image, categoryId],
  );
}

module.exports = {
  getAllCategories,
  getCategoryByName,
  addCategory,
  getAllTours,
  getTourById,
  getTourByCategory,
  addTour,
  updateCategory,
  removeCategory,
};
