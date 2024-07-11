const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { dataBase } = require("./src/models/script");
const studentRoutes = require("./src/routes/studentRoutes");
const marksRoutes = require("./src/routes/marksRoutes");

const app = express();
const port = 3000;
app.use(bodyParser.json());

//call form frontend
app.use(cors());
//student and marks api routers
app.use("/api/student", studentRoutes);
app.use("/api/marks", marksRoutes);

//default api
app.get("*", (req, res) => {
  res.send("Home API OR Wrong API!");
});

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
  //database script for Creation and connetion
  dataBase();
});
