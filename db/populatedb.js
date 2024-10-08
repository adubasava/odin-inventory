﻿require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR (100) UNIQUE
);

CREATE TABLE IF NOT EXISTS tours (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   title VARCHAR (100) UNIQUE,
   description VARCHAR (500),
   location VARCHAR (200),   
   imageurl VARCHAR (500), 
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

INSERT INTO tours (title, description, location, imageurl, category_id)
VALUES 
  ('Trip to Tatra', 'Vacation on Tatry', 'Poland', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Rysy_006.JPG', 1), 
  ('Trip to Baltic shore', 'Vacation on Baltic Sea', 'Lithuania', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Sunny_day_on_the_coast_on_Baltic_sea.jpg', 2), 
  ('Trip to Paris', 'Visit France!', 'France', 'https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg', 3),
  ('Trip to London', 'Visit Great Britain!', 'Great Britain', 'https://upload.wikimedia.org/wikipedia/commons/6/67/London_Skyline_%28125508655%29.jpeg', 3),
  ('Trip to Warsaw', 'Visit Poland!', 'Poland', 'https://upload.wikimedia.org/wikipedia/commons/3/35/Aleja_Niepdleglosci_Warsaw_2022_aerial_%28cropped%29.jpg', 3),
  ('Trip to Carpathians', 'Vacation on Carpathians', 'Poland', 'https://upload.wikimedia.org/wikipedia/commons/5/50/Morskie_oko_o_swicie.jpg', 1)
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
