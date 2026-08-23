import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, FlaskConical } from "lucide-react";
import { foundationPoints, modules } from "@/lib/chemistry";

export default function ChemistryPage() {
  return <div className="page-wrap chemistry-page">
    <div className="breadcrumbs"><Link href="/subjects">Subjects</Link><span>›</span><span>Chemistry</span><span>›</span><span>OCR A</span></div>
    <header className="subject-hero"><div className="subject-hero-icon"><FlaskConical size={28}/></div><div><span className="eyebrow">A Level · OCR A · H432</span><h1>Chemistry</h1><p>Work through your course specification one section at a time, then use recall, practice and exam questions to build mastery.</p></div><div className="overall-mastery"><strong>31%</strong><span>overall mastery</span></div></header>
    <div className="chemistry-layout">
      <section className="module-list">
        <div className="section-heading"><div><span className="eyebrow">Specification</span><h2>Modules</h2></div><span className="muted">6 modules</span></div>
        {modules.map(m => <div key={m.code} className={m.code === "2" ? "module-row selected" : "module-row"}><span className="module-number">{m.code}</span><div className="module-copy"><strong>{m.title}</strong><div className="progress-track compact"><span style={{width:`${m.mastery}%`}}/></div></div><span className="module-percent">{m.mastery}%</span><ChevronRight size={18}/></div>)}
      </section>
      <section className="spec-panel">
        <div className="spec-panel-head"><div><span className="eyebrow">Module 2</span><h2>Foundations in chemistry</h2></div><span className="status-pill">In progress</span></div>
        <p className="muted">Choose a topic below to see the sections you need to know and continue your study progress.</p>
        <div className="spec-point-list">
          {foundationPoints.map(p => <Link key={p.code} href={p.href!} className="spec-point">
            <div className={p.mastery >= 70 ? "mastery-dot good" : p.mastery >= 35 ? "mastery-dot medium" : p.mastery > 0 ? "mastery-dot low" : "mastery-dot empty"}></div>
            <div><span>{p.code}</span><strong>{p.title}</strong><small>{p.summary}</small></div>
            <div className="spec-score">{p.mastery > 0 ? <strong>{p.mastery}%</strong> : <strong>Start</strong>}<ArrowRight size={17}/></div>
          </Link>)}
        </div>
        <div className="module-goal"><CheckCircle2 size={20}/><div><strong>Build mastery across the module</strong><p>Learn each section, test your recall, practise the calculations and finish with exam-style questions. Your progress builds as each part becomes secure.</p></div></div>
      </section>
    </div>
  </div>;
}
