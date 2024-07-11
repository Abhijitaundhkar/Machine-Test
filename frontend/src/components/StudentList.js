import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudents = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/student/getStudents?page=${page}&limit=10`
      );
      setStudents(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/student/deleteStudents/${id}`
      );
      Swal.fire("Deleted!", "Student has been deleted.", "success");
      fetchStudents(page);
    } catch (error) {
      console.error("Error deleting student:", error);
      Swal.fire("Error!", "Failed to delete the student.", "error");
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add" className="btn btn-primary mb-3">
        Add Student
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>
                <Link
                  to={`/edit/${student.student_id}`}
                  className="btn btn-warning mr-2"
                >
                  Edit
                </Link>
                <Button
                  style={{ margin: "10px" }}
                  variant="danger"
                  onClick={() => handleDelete(student.student_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(totalPages).keys()].map((num) => (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === page}
            onClick={() => setPage(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default StudentList;
