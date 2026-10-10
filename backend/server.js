const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Student = mongoose.model("Student", { name: String, age: Number });

// CREATE
app.post("/student", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// READ
app.get("/student", async (req, res) => {
  const data = await Student.find();
  res.send(data);
});

// UPDATE
app.put("/student/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// DELETE
app.delete("/student/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Running on " + PORT));