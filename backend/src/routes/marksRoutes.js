const express = require("express");
const router = express.Router();
const {
  addStudentMarks,
  getAllStudentMarks,
  getAllMarks,
  updateStudentMarks,
  deleteStudentMarks,
} = require("../controller/marksController");
//mark routes
router.get("/", getAllMarks);
router.post("/:studentId", addStudentMarks);
router.get("/:markId", getAllStudentMarks);
router.put("/:studentId/:markId", updateStudentMarks);
router.delete("/:studentId/:markId", deleteStudentMarks);

module.exports = router;
