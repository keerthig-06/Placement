import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">STUDENT DEVELOPMENT • PLACEMENT READINESS</p>
          <h1>Build skills.<br /><span>Track readiness.</span></h1>
          <p className="hero-text">Record student assessments, monitor technical and communication skills, and keep placement preparation organized in one place.</p>
          <br />
          <div className="actions">
            <Link className="btn primary" to="/add">＋ Add Student</Link>
            <br/>
            <Link className="btn secondary" to="/students">View Student List</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-card"><div className="art-icon">✓</div><div><b>Placement profile</b><small>Skills assessment</small></div><span className="art-status">Active</span></div>
          <div className="score-card"><small>Readiness overview</small><strong>100%</strong><div className="progress"><i /></div><small>Track progress consistently</small></div>
          <div className="float-dot">✦</div>
        </div>
      </section>
      <section className="feature-grid">
        <article className="feature-card"><span>01</span><h3>Manage student records</h3><p>Add, view, update and delete student skill assessment details.</p></article>
        <article className="feature-card"><span>02</span><h3>Assess key skills</h3><p>Record technical skills, aptitude scores and communication levels.</p></article>
        <article className="feature-card"><span>03</span><h3>Monitor readiness</h3><p>Identify placement readiness status and support student progress.</p></article>
      </section>
    </>
  );
}