require("dotenv").config();
const { Pool, Client } = require("pg");

//Client: Single, manual connection. Suitable for standalone scripts or when a single connection is sufficient.
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

//Manages multiple connections automatically. Suitable for web applications or scenarios with multiple concurrent database queries.
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

async function dataBase() {
  await client.connect();
  console.log("Database Connection has been established successfully.");

  try {
    const res = await client.query(
      `SELECT datname FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME]
    );
    if (res.rowCount === 0) {
      console.log(`${process.env.DB_NAME} database not found, creating it.`);
      await client.query(`CREATE DATABASE "${process.env.DB_NAME}";`);
      console.log(`Created database ${process.env.DB_NAME}`);
    } else {
      console.log(`${process.env.DB_NAME} database exists.`);
    }
    await pool.query(`CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);`);
    await pool.query(`CREATE TABLE IF NOT EXISTS marks (
    mark_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    subject VARCHAR(50) NOT NULL,
    mark INTEGER NOT NULL CHECK (mark >= 0 AND mark <= 100),
    FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE
);
`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await client.end();
  }
}
module.exports = { dataBase, pool };
