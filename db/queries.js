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

// --- TOURS ---

async function getAllTours() {
  const { rows } = await pool.query(
    "SELECT tours.id, title, description, location, name FROM tours INNER JOIN categories ON category_id=categories.id;",
  );
  return rows;
}

async function getTourById(tourId) {
  const { rows } = await pool.query(
    "SELECT tours.id, title, description, location, name FROM tours INNER JOIN categories ON category_id=categories.id WHERE tours.id = $1",
    [tourId],
  );
  console.log(rows);
  return rows;
}

async function getTourByCategory(categoryName) {
  const { rows } = await pool.query(
    "SELECT title, description, location, name FROM tours INNER JOIN categories ON category_id=categories.id WHERE name = $1",
    [categoryName],
  );
  return rows;
}

async function addTour(title, description, location, categoryId) {
  await pool.query(
    "INSERT INTO tours (title, description, location, category_id) VALUES ($1, $2, $3, $4)",
    [title, description, location, categoryId],
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
};
