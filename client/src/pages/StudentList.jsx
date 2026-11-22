import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteStudent, getStudents } from "../api";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    try { const { data } = await getStudents(); setStudents(data); setError(""); }
    catch { setError("Could not connect to the API. Start the backend and MongoDB, then refresh."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    if (!window.confirm("Delete this student record?")) return;
    try { await deleteStudent(id); setStudents(current => current.filter(s => s._id !== id)); }
    catch { setError("Unable to delete this record."); }
  };

  return (
    <section className="page-wrap">
      <div className="page-heading"><div><p className="eyebrow">ASSESSMENT RECORDS</p><h1>Student skill list</h1><p>View and manage student placement assessment details.</p><br></br></div><Link to="/add" className="btn primary">＋ Add Student</Link></div>
      {error && <div className="alert">{error}</div>}
      <div className="table-card">
        {loading ? <p className="empty">Loading student records...</p> : students.length === 0 ? <div className="empty"><div className="empty-icon">▤</div><h3>No student records yet</h3><p>Add a student to begin monitoring placement readiness.</p><Link className="btn primary" to="/add">Add First Student</Link></div> :
          <div className="table-scroll"><table><thead><tr><th>Student</th><th>Register No.</th><th>Department</th><th>Technical skills</th><th>Aptitude</th><th>Communication</th><th>Readiness</th><th>Actions</th></tr></thead><tbody>
            {students.map(student => <tr key={student._id}>
              <td><b>{student.name}</b></td><td>{student.registerNumber}</td><td>{student.department}</td>
              <td>{(student.technicalSkills || []).join(", ") || "—"}</td><td>{student.aptitudeScore}/100</td><td>{student.communicationSkills}</td>
              <td><span className={`status ${student.placementReadiness.toLowerCase().replaceAll(" ", "-")}`}>{student.placementReadiness}</span></td>
              <td><div className="row-actions"><Link to={`/edit/${student._id}`}>Edit</Link><button onClick={() => remove(student._id)}>Delete</button></div></td>
            </tr>)}
          </tbody></table></div>}
      </div>
    </section>
  );
}