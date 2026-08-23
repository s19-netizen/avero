'use client';

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Clock3, FlaskConical, ListChecks } from "lucide-react";
import type { Module2Topic } from "@/lib/module2TopicData";

export function TopicOverview({ topic }: { topic: Module2Topic }) {
  const first = topic.subpoints[0];

  return (
    <div className="page-wrap" style={{maxWidth:1180}}>
      <div className="breadcrumbs">
        <Link href="/subjects">Subjects</Link><span>›</span>
        <Link href="/chemistry/ocr-a">OCR A Chemistry</Link><span>›</span>
        <span>{topic.code}</span>
      </div>

      <header style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 250px',gap:22,alignItems:'stretch',marginBottom:24}}>
        <div style={{background: topic.accent === 'blue' ? '#eef8ff' : '#f2f0ff',border:'1px solid #e1e5f2',borderRadius:22,padding:'28px 30px'}}>
          <span className="eyebrow">Module 2 · Foundations in chemistry</span>
          <h1 style={{fontSize:38,marginBottom:10}}>{topic.code} {topic.title}</h1>
          <p style={{fontSize:15,maxWidth:760,marginBottom:18}}>{topic.description}</p>
          <Link href={`/chemistry/ocr-a/${topic.code.replaceAll('.', '-')}/${first.id}`} className="primary-button">
            Start first section <ArrowRight size={17}/>
          </Link>
        </div>

        <div className="content-card" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',padding:22}}>
          <div>
            <span className="content-kicker">Topic sections</span>
            <strong style={{fontSize:30,display:'block',margin:'7px 0 2px'}}>{topic.subpoints.length}</strong>
            <span style={{fontSize:12,color:'#7d899e'}}>sections to master</span>
          </div>
          <div style={{display:'grid',gap:8,marginTop:22}}>
            <div style={{display:'flex',gap:8,alignItems:'center',fontSize:12,color:'#5f6d87'}}><BookOpen size={16} color="#7567e8"/> Learn each idea separately</div>
            <div style={{display:'flex',gap:8,alignItems:'center',fontSize:12,color:'#5f6d87'}}><ListChecks size={16} color="#71bcae"/> Track progress section by section</div>
          </div>
        </div>
      </header>

      <section style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 290px',gap:20,alignItems:'start'}}>
        <div>
          <div className="section-heading">
            <div><span className="eyebrow">Specification points</span><h2>Work through the topic in chunks</h2></div>
          </div>

          <div style={{display:'grid',gap:11}}>
            {topic.subpoints.map((point,index) => (
              <Link key={point.id} href={`/chemistry/ocr-a/${topic.code.replaceAll('.', '-')}/${point.id}`} className="content-card" style={{padding:'17px 18px',display:'grid',gridTemplateColumns:'44px minmax(0,1fr) auto',gap:14,alignItems:'center',transition:'transform .15s ease,border-color .15s ease'}}>
                <span style={{width:44,height:44,borderRadius:13,display:'grid',placeItems:'center',background:index===0?'#7567e8':'#f0efff',color:index===0?'white':'#6254d8',fontWeight:850,fontSize:13}}>{index+1}</span>
                <div>
                  <span style={{fontSize:10,fontWeight:800,color:'#8a96aa',textTransform:'uppercase',letterSpacing:'.05em'}}>{topic.code} · Section {index+1}</span>
                  <strong style={{display:'block',fontSize:15,margin:'3px 0 4px'}}>{point.friendlyTitle}</strong>
                  <small style={{display:'block',fontSize:12,lineHeight:1.45,color:'#7d899e'}}>{point.summary}</small>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <span style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'#8490a5'}}><Clock3 size={13}/>{point.time}</span>
                  <ChevronRight size={18} color="#7567e8"/>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside style={{display:'grid',gap:14,position:'sticky',top:28}}>
          <div className="content-card" style={{padding:20}}>
            <span className="content-kicker">How to study this topic</span>
            <h3 style={{margin:'6px 0 11px'}}>One topic, several focused lessons</h3>
            <p style={{fontSize:12,marginBottom:0}}>Open a section to learn the idea, review it, practise it and apply it to exam-style questions before moving on.</p>
          </div>
          <div className="content-card" style={{padding:20,background:'#f1fbf8'}}>
            <CheckCircle2 size={20} color="#3b9683"/>
            <strong style={{display:'block',fontSize:13,margin:'9px 0 4px'}}>Build mastery section by section</strong>
            <p style={{fontSize:12,margin:0}}>Secure the individual sections and your overall topic mastery will rise with them.</p>
          </div>
          <Link href="/chemistry/ocr-a" className="secondary-button" style={{width:'100%'}}><FlaskConical size={16}/> Full specification</Link>
        </aside>
      </section>

      <div className="prev-next" style={{marginTop:30}}>
        <Link href={topic.previous} className="secondary-button"><ArrowLeft size={17}/> Previous topic</Link>
        <Link href={topic.next} className="primary-button">Next topic <ArrowRight size={17}/></Link>
      </div>
    </div>
  );
}
