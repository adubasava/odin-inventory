const pool = require("./pool");

// --- CATEGORIES ---

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategoriesWithTourNumber() {
  const { rows } = await pool.query(
    "SELECT name, COUNT(title) AS tnumber  FROM categories LEFT JOIN tours ON category_id=categories.id GROUP BY categories.name;",
  );
  return rows;
}

async function getCategoriesWithTours() {
  const { rows } = await pool.query(
    "SELECT name, COUNT(title) AS tnumber  FROM categories LEFT JOIN tours ON category_id=categories.id GROUP BY categories.name HAVING COUNT(title) > 0 ORDER BY COUNT(title) DESC LIMIT 3;",
  );
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
    "SELECT tours.id, title, description, location, imageurl, name FROM tours INNER JOIN categories ON category_id=categories.id;",
  );
  return rows;
}

async function getRecentTours() {
  const { rows } = await pool.query(
    "SELECT tours.id, title, description, location, imageurl, name FROM tours INNER JOIN categories ON category_id=categories.id ORDER BY tours.id DESC LIMIT 3;",
  );
  return rows;
}

async function getTourById(tourId) {
  const { rows } = await pool.query(
    "SELECT tours.id, title, description, location, imageurl, category_id, name FROM tours INNER JOIN categories ON category_id=categories.id WHERE tours.id = $1",
    [tourId],
  );
  console.log(rows);
  return rows;
}

async function getTourByCategory(categoryName) {
  const { rows } = await pool.query(
    "SELECT title, description, location, imageurl, name FROM tours INNER JOIN categories ON category_id=categories.id WHERE name = $1",
    [categoryName],
  );
  return rows;
}

async function addTour(title, description, location, imageurl, categoryId) {
  await pool.query(
    "INSERT INTO tours (title, description, location, imageurl, category_id) VALUES ($1, $2, $3, $4, $5)",
    [title, description, location, imageurl, categoryId],
  );
}

async function updateTour(
  title,
  description,
  location,
  imageurl,
  categoryId,
  tourId,
) {
  await pool.query(
    "UPDATE tours SET title = ($1), description = ($2), location = ($3), imageURL = ($4), category_id = ($5) WHERE id = ($6)",
    [title, description, location, imageurl, categoryId, tourId],
  );
}

async function removeTour(tourId) {
  await pool.query("DELETE FROM tours WHERE id = ($1)", [tourId]);
}

module.exports = {
  getAllCategories,
  getCategoriesWithTourNumber,
  getCategoriesWithTours,
  getCategoryByName,
  addCategory,
  getAllTours,
  getRecentTours,
  getTourById,
  getTourByCategory,
  addTour,
  updateCategory,
  removeCategory,
  updateTour,
  removeTour,
};
