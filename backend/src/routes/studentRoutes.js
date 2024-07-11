const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAllStudent,
  getStudentById,
  updateStudentData,
  deleteStudent,
} = require("../controller/studentController");

///student routes
router.post("/students", addStudent);
router.get("/getStudents", getAllStudent);
router.get("/getStudents/:id/", getStudentById);
router.put("/updatesStudents/:id", updateStudentData);
router.delete("/deleteStudents/:id", deleteStudent);

module.exports = router;
