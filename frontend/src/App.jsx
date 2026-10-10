import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const load = () => {
    axios.get(API + "/student").then(res => setStudents(res.data));
  };

  useEffect(() => { load(); }, []);

  const add = () => {
    if (!name.trim() || !age) {
      alert("Please enter both name and age");
      return;
    }
    axios.post(API + "/student", { name, age: Number(age) }).then(() => {
      setName("");
      setAge("");
      load();
    });
  };

  const remove = (id) => {
    axios.delete(API + "/student/" + id).then(load);
  };

  return (
    <div className="card">
      <h1>🎓 Student List</h1>
      <p className="subtitle">
        Total students: <span className="badge">{students.length}</span>
      </p>

      <div className="form">
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
        />
        <button className="btn-add" onClick={add}>＋ Add</button>
      </div>

      {students.length === 0 && <p className="empty">No students yet. Add one above!</p>}

      <ul>
        {students.map((s, i) => (
          <li key={s._id} style={{ borderLeftColor: colors[i % colors.length] }}>
            <div className="avatar" style={{ background: colors[i % colors.length] }}>
              {s.name ? s.name[0].toUpperCase() : "?"}
            </div>
            <div className="info">
              <strong>{s.name || "No name"}</strong>
              <span>Age: {s.age ?? "-"}</span>
            </div>
            <button className="btn-delete" onClick={() => remove(s._id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;