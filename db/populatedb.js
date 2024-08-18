require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS tours (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   title VARCHAR (100),
   description VARCHAR (500),
   location VARCHAR (200),
   category_id INT,  
   CONSTRAINT fk_categories
      FOREIGN KEY(category_id) 
        REFERENCES categories(id)
	ON DELETE CASCADE
);

INSERT INTO categories (name) 
VALUES
  ('Mountains'), 
  ('Sea'), 
  ('City tours');

INSERT INTO tours (title, description, location, category_id)
VALUES 
  ('Trip to Tatry', 'Vacation on Tatry', 'Poland', 1), 
  ('Trip to Baltic shore', 'Vacation on Baltic Sea', 'Lithuania', 2), 
  ('Trip to Paris', 'See France!', 'France', 3);  
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
