import Link from "next/link";
import { ArrowRight, FlaskConical, Dna, Sigma, Atom, BookOpenText } from "lucide-react";

const subjects = [
  { name: "Chemistry", detail: "OCR A · A Level", icon: FlaskConical, active: true, href: "/chemistry/ocr-a", progress: 31 },
  { name: "Biology", detail: "Add a course", icon: Dna, active: false, progress: 0 },
  { name: "Physics", detail: "Add a course", icon: Atom, active: false, progress: 0 },
  { name: "Maths", detail: "Add a course", icon: Sigma, active: false, progress: 0 },
];

export default function SubjectsPage() {
  return <div className="page-wrap"><header className="page-header"><div><span className="eyebrow">Subjects</span><h1>Your courses</h1><p>Study through the exact specification, one point at a time.</p></div></header><div className="subject-grid">{subjects.map(s => { const Icon=s.icon; const body=<><div className="large-subject-icon"><Icon size={28}/></div><div><h2>{s.name}</h2><p>{s.detail}</p></div>{s.active && <><div className="progress-track"><span style={{width:`${s.progress}%`}}/></div><div className="subject-footer"><span>{s.progress}% overall mastery</span><ArrowRight size={18}/></div></>}</>; return s.active ? <Link key={s.name} href={s.href!} className="subject-card active-subject">{body}</Link> : <div key={s.name} className="subject-card disabled-subject">{body}<button>+ Add course</button></div>})}</div><section className="info-strip"><BookOpenText size={22}/><div><strong>Built around what your exam board actually asks</strong><p>Avero connects every note, flashcard, practice set and exam question back to a specification point so you always know why you’re studying it.</p></div></section></div>;
}
