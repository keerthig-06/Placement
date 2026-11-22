import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addStudent, getStudent, updateStudent } from "../api";

const initial = {
  name: "", registerNumber: "", department: "", technicalSkills: "",
  aptitudeScore: 0, communicationSkills: "Intermediate", placementReadiness: "In Progress"
};

export default function StudentForm() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);

  useEffect(() => {
    if (id) getStudent(id).then(({ data }) => setForm({
      ...data, technicalSkills: (data.technicalSkills || []).join(", ")
    })).catch(() => setError("Unable to load this student record."));
  }, [id]);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true); setError("");
    const payload = { ...form, aptitudeScore: Number(form.aptitudeScore) };
    try {
      if (editing) await updateStudent(id, payload);
      else await addStudent(payload);
      navigate("/students");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the record. Check that the server and MongoDB are running.");
    } finally { setSaving(false); }
  };

  return (
    <section className="page-wrap narrow">
      <div className="page-heading"><div><p className="eyebrow">STUDENT ASSESSMENT</p><h1>{editing ? "Update student skills" : "Add student skills"}</h1><p>Enter the student's details and current skill assessment.</p></div><Link to="/students" className="back-link">← Student list</Link></div>
      <form className="form-card" onSubmit={submit}>
        {error && <div className="alert">{error}</div>}
        <div className="form-grid">
          <label>Student name<input name="name" value={form.name} onChange={change} required placeholder="Enter full name" /></label>
          <label>Register number<input name="registerNumber" value={form.registerNumber} onChange={change} required placeholder="e.g. 24IT001" /></label>
          <label className="full">Department<input name="department" value={form.department} onChange={change} required placeholder="e.g. Information Technology" /></label>
          <label className="full">Technical skills <small>Separate multiple skills with commas</small><input name="technicalSkills" value={form.technicalSkills} onChange={change} placeholder="Java, Python, React, SQL" /></label>
          <label>Aptitude score (0–100)<input type="number" name="aptitudeScore" min="0" max="100" value={form.aptitudeScore} onChange={change} required /></label>
          <label>Communication skills<select name="communicationSkills" value={form.communicationSkills} onChange={change}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
          <label className="full">Placement readiness<select name="placementReadiness" value={form.placementReadiness} onChange={change}><option>Ready</option><option>In Progress</option><option>Not Ready</option></select></label>
        </div>
        <div className="form-actions"><Link className="btn secondary" to="/students">Cancel</Link><button className="btn primary" disabled={saving}>{saving ? "Saving..." : editing ? "Update Record" : "Save Student"}</button></div>
      </form>
    </section>
  );
}