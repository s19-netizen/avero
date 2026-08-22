import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Brain, FilePenLine, Target, LockKeyhole } from "lucide-react";

const stages = [
  { name: "Learn", icon: BookOpen, text: "Notes and worked examples will live here." },
  { name: "Recall", icon: Brain, text: "Flashcards and quick recall will live here." },
  { name: "Practise", icon: FilePenLine, text: "Practice sets and calculations will live here." },
  { name: "Exam", icon: Target, text: "Exam-style questions and walkthroughs will live here." },
  { name: "Master", icon: LockKeyhole, text: "Mastery checks and common mistakes will live here." },
];

export function PlaceholderSpec({ code, title, previous, next }: { code: string; title: string; previous: string; next?: string }) {
  return (
    <div className="page-wrap">
      <div className="breadcrumbs"><Link href="/subjects">Subjects</Link><span>›</span><Link href="/chemistry/ocr-a">OCR A Chemistry</Link><span>›</span><span>{code}</span></div>
      <header className="page-header">
        <div><span className="eyebrow">Module 2 · Foundations in chemistry</span><h1>{code} {title}</h1><p>This page is connected so the prototype flow works. Detailed teaching content can be added later.</p></div>
      </header>
      <section className="content-card" style={{marginBottom:18}}>
        <span className="content-kicker">Study flow</span>
        <h2>Same structure on every specification point</h2>
        <p>Students always know what to do next: learn the idea, retrieve it, practise it, apply it to exam questions, then prove mastery.</p>
      </section>
      <div className="mastery-preview" style={{gridTemplateColumns:"repeat(5,minmax(0,1fr))", marginBottom:24}}>
        {stages.map(({name, icon: Icon, text}) => <div className="mastery-point empty" key={name}><Icon size={20}/><strong>{name}</strong><small>{text}</small></div>)}
      </div>
      <div className="prev-next">
        <Link href={previous} className="secondary-button"><ArrowLeft size={17}/> Previous</Link>
        {next ? <Link href={next} className="primary-button">Next specification point <ArrowRight size={17}/></Link> : <Link href="/chemistry/ocr-a" className="primary-button">Back to specification <ArrowRight size={17}/></Link>}
      </div>
    </div>
  );
}
