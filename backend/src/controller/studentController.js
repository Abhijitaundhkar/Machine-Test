const { pool } = require("../models/script");

// Create a new student record
const addStudent = async (req, res) => {
  const { first_name, last_name, age, email } = req.body;
  console.log(req.body);
  try {
    const result = await pool.query(
      "INSERT INTO students (first_name, last_name,age, email) VALUES ($1,$2,$3,$4) RETURNING *",
      [first_name, last_name, age, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Retrieve a list of all students
const getAllStudent = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      "SELECT * FROM students LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    const countResult = await pool.query("SELECT COUNT(*) FROM students");
    const totalCount = parseInt(countResult.rows[0].count, 10);

    res.status(200).json({
      data: result.rows,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page, 10),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single student by ID with marks
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const studentResult = await pool.query(
      "SELECT * FROM students WHERE student_id = $1",
      [id]
    );
    const marksResult = await pool.query(
      "SELECT * FROM marks WHERE student_id = $1",
      [id]
    );
    if (studentResult.rows.length === 0) {
      res.status(404).json({ error: "Student not found" });
    } else {
      res.status(200).json({
        student: studentResult.rows[0],
        marks: marksResult.rows,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student's information
const updateStudentData = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE students SET first_name = $1, last_name = $2, age=$3,email = $4 WHERE student_id = $5 RETURNING *",
      [first_name, last_name, age, email, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Student not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student record
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM students WHERE student_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Student not found" });
    } else {
      res.status(200).json({ message: "Student deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addStudent,
  getAllStudent,
  getStudentById,
  updateStudentData,
  deleteStudent,
};
