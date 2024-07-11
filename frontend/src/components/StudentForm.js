import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const StudentForm = () => {
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchStudent(id);
    }
  }, [id]);

  const fetchStudent = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/student/getStudents/${id}`
      );
      setStudent(response.data.student);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(
          `http://localhost:3000/api/student/updatesStudents/${id}`,
          student
        );
        Swal.fire("Updated!", "Student has been updated.", "success");
      } else {
        await axios.post("http://localhost:3000/api/student/students", student);
        Swal.fire("Created!", "Student has been created.", "success");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving student:", error);
      Swal.fire("Error!", "Failed to save the student.", "error");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Student" : "Add Student"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={student.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={student.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="age"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? "Update" : "Add"}
        </Button>
      </Form>
    </div>
  );
};

export default StudentForm;
