const { pool } = require("../models/script");

// Add a new mark for a student
const addStudentMarks = async (req, res) => {
  const { studentId } = req.params;
  const { subject, mark } = req.body;

  try {
    // Check if the student exists
    const student = await pool.query(
      "SELECT * FROM students WHERE student_id = $1",
      [studentId]
    );
    if (student.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Insert the new mark
    const newMark = await pool.query(
      "INSERT INTO marks (student_id, subject, mark) VALUES ($1, $2, $3) RETURNING *",
      [studentId, subject, mark]
    );

    res.status(201).json(newMark.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all marks for a student
const getAllStudentMarks = async (req, res) => {
  const { markId } = req.params;

  try {
    // Retrieve marks for the student
    const marks = await pool.query("SELECT * FROM marks WHERE mark_id = $1", [
      markId,
    ]);

    res.status(200).json(marks.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all marks
const getAllMarks = async (req, res) => {
  try {
    console.log("aaaaa");
    const result = await pool.query("SELECT * FROM marks");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a mark for a student
const updateStudentMarks = async (req, res) => {
  const { studentId, markId } = req.params;
  const { subject, mark } = req.body;

  try {
    // Check if the student exists
    const student = await pool.query(
      "SELECT * FROM students WHERE student_id = $1",
      [studentId]
    );
    if (student.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update the mark
    const updatedMark = await pool.query(
      "UPDATE marks SET subject = $1, mark = $2 WHERE mark_id = $3 AND student_id = $4 RETURNING *",
      [subject, mark, markId, studentId]
    );

    if (updatedMark.rows.length === 0) {
      return res.status(404).json({ error: "Mark not found for the student" });
    }

    res.status(200).json(updatedMark.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a mark for a student
const deleteStudentMarks = async (req, res) => {
  const { studentId, markId } = req.params;

  try {
    // Check if the student exists
    const student = await pool.query(
      "SELECT * FROM students WHERE student_id = $1",
      [studentId]
    );
    if (student.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Delete the mark
    const deletedMark = await pool.query(
      "DELETE FROM marks WHERE mark_id = $1 AND student_id = $2 RETURNING *",
      [markId, studentId]
    );

    if (deletedMark.rows.length === 0) {
      return res.status(404).json({ error: "Mark not found for the student" });
    }

    res.status(200).json({ message: "Mark deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addStudentMarks,
  getAllStudentMarks,
  getAllMarks,
  updateStudentMarks,
  deleteStudentMarks,
};
