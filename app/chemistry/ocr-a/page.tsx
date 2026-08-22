import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, FlaskConical } from "lucide-react";
import { foundationPoints, modules } from "@/lib/chemistry";

export default function ChemistryPage() {
  return <div className="page-wrap chemistry-page">
    <div className="breadcrumbs"><Link href="/subjects">Subjects</Link><span>›</span><span>Chemistry</span><span>›</span><span>OCR A</span></div>
    <header className="subject-hero"><div className="subject-hero-icon"><FlaskConical size={28}/></div><div><span className="eyebrow">A Level · OCR A · H432</span><h1>Chemistry</h1><p>Your specification is the map. Every study activity below feeds into mastery.</p></div><div className="overall-mastery"><strong>31%</strong><span>overall mastery</span></div></header>
    <div className="chemistry-layout">
      <section className="module-list"><div className="section-heading"><div><span className="eyebrow">Specification</span><h2>Modules</h2></div><span className="muted">6 modules</span></div>{modules.map(m => <div key={m.code} className={m.code === "2" ? "module-row selected" : "module-row"}><span className="module-number">{m.code}</span><div className="module-copy"><strong>{m.title}</strong><div className="progress-track compact"><span style={{width:`${m.mastery}%`}}/></div></div><span className="module-percent">{m.mastery}%</span><ChevronRight size={18}/></div>)}</section>
      <section className="spec-panel"><div className="spec-panel-head"><div><span className="eyebrow">Module 2</span><h2>Foundations in chemistry</h2></div><span className="status-pill">In progress</span></div><p className="muted">Start with the weakest active point, or choose exactly what you want to study.</p><div className="spec-point-list">{foundationPoints.map(p => p.href ? <Link key={p.code} href={p.href} className="spec-point"><div className={p.mastery >= 70 ? "mastery-dot good" : p.mastery >= 35 ? "mastery-dot medium" : "mastery-dot low"}></div><div><span>{p.code}</span><strong>{p.title}</strong><small>{p.summary}</small></div><div className="spec-score"><strong>{p.mastery}%</strong><ArrowRight size={17}/></div></Link> : <div key={p.code} className="spec-point placeholder"><div className={p.mastery ? "mastery-dot low" : "mastery-dot empty"}></div><div><span>{p.code}</span><strong>{p.title}</strong><small>{p.summary}</small></div><div className="placeholder-label">Coming next</div></div>)}</div><div className="module-goal"><CheckCircle2 size={20}/><div><strong>Module goal</strong><p>Secure the first two foundations, then Avero will open the next priority sequence.</p></div></div></section>
    </div>
  </div>;
}
