const pool = require("./pool");

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

module.exports = {
  getAllCategories,
  getCategoryByName,
  addCategory,
};
