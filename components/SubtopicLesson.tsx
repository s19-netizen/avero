'use client';

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Beaker, BookOpen, Brain, CheckCircle2, ChevronRight, FilePenLine, Lightbulb, Target, TriangleAlert } from "lucide-react";
import type { Module2Subpoint, Module2Topic } from "@/lib/module2TopicData";

const tabs = ["Learn", "Recall", "Practise", "Exam", "Master"] as const;
type Tab = typeof tabs[number];

export function SubtopicLesson({ topic, point }: { topic: Module2Topic; point: Module2Subpoint }) {
  const [tab,setTab] = useState<Tab>('Learn');
  const index = topic.subpoints.findIndex(p => p.id === point.id);
  const previous = topic.subpoints[index-1];
  const next = topic.subpoints[index+1];
  const base = `/chemistry/ocr-a/${topic.code.replaceAll('.', '-')}`;

  return (
    <div style={{maxWidth:1370,margin:'0 auto',display:'grid',gridTemplateColumns:'minmax(0,1fr) 285px',minHeight:'100vh'}}>
      <main style={{padding:'38px 42px 70px',minWidth:0}}>
        <div className="breadcrumbs">
          <Link href="/subjects">Subjects</Link><span>›</span>
          <Link href="/chemistry/ocr-a">OCR A Chemistry</Link><span>›</span>
          <Link href={base}>{topic.code}</Link><span>›</span>
          <span>Section {index+1}</span>
        </div>

        <header style={{marginBottom:20}}>
          <span className="eyebrow">{topic.code} {topic.title} · Section {index+1} of {topic.subpoints.length}</span>
          <h1 style={{fontSize:36,marginBottom:9}}>{point.friendlyTitle}</h1>
          <p style={{fontSize:15,maxWidth:760,marginBottom:0}}>{point.summary}</p>
        </header>

        <section className="spec-wording" style={{marginBottom:21}}>
          <div className="spec-label">From your specification map</div>
          <p>{point.sourceTitle}</p>
        </section>

        <div className="study-tabs">{tabs.map(t => <button key={t} onClick={()=>setTab(t)} className={tab===t?'study-tab active':'study-tab'}>{t}</button>)}</div>

        {tab === 'Learn' && <Learn point={point}/>} 
        {tab === 'Recall' && <PrototypePanel icon={<Brain size={23}/>} kicker="Recall" title="Recall will sit under this exact section" text={`Flashcards for “${point.friendlyTitle}” will live here, rather than being mixed with every other ${topic.title.toLowerCase()} card.`}/>} 
        {tab === 'Practise' && <PrototypePanel icon={<FilePenLine size={23}/>} kicker="Practise" title="Practice stays tied to the section" text="This will eventually hold short questions, calculations and worksheet-style sets tagged specifically to this specification point."/>}
        {tab === 'Exam' && <PrototypePanel icon={<Target size={23}/>} kicker="Exam questions" title="Then apply only this idea to exam questions" text="Past-paper and Avero-written questions can be filtered to this section, with marks, walkthroughs and examiner-language feedback."/>}
        {tab === 'Master' && <PrototypePanel icon={<CheckCircle2 size={23}/>} kicker="Master" title="One mastery score for this section" text="A short check can decide whether this individual specification point is secure. The parent topic can then combine the scores from all its sections."/>}

        <div className="prev-next" style={{marginTop:28}}>
          {previous ? <Link href={`${base}/${previous.id}`} className="secondary-button"><ArrowLeft size={17}/> Previous section</Link> : <Link href={base} className="secondary-button"><ArrowLeft size={17}/> Topic overview</Link>}
          {next ? <Link href={`${base}/${next.id}`} className="primary-button">Next section <ArrowRight size={17}/></Link> : <Link href={topic.next} className="primary-button">Next topic <ArrowRight size={17}/></Link>}
        </div>
      </main>

      <aside style={{borderLeft:'1px solid #e5e9f2',background:'#fbfcff',padding:'36px 18px',position:'sticky',top:0,height:'100vh',overflowY:'auto'}}>
        <Link href={base} style={{display:'flex',alignItems:'center',gap:7,fontSize:12,fontWeight:800,color:'#6557dc',marginBottom:18}}><ArrowLeft size={15}/> {topic.code} overview</Link>
        <span className="content-kicker">In this topic</span>
        <div style={{display:'grid',gap:6}}>
          {topic.subpoints.map((item,i) => {
            const active = item.id === point.id;
            return <Link key={item.id} href={`${base}/${item.id}`} style={{display:'grid',gridTemplateColumns:'28px minmax(0,1fr) 14px',gap:8,alignItems:'center',padding:'10px 9px',borderRadius:11,background:active?'#efedff':'transparent',border:active?'1px solid #ded9ff':'1px solid transparent'}}>
              <span style={{width:26,height:26,borderRadius:8,display:'grid',placeItems:'center',fontSize:10,fontWeight:850,background:active?'#7567e8':'#eef1f6',color:active?'#fff':'#758198'}}>{i+1}</span>
              <span style={{fontSize:11,lineHeight:1.35,fontWeight:active?750:600,color:active?'#40359f':'#63708a'}}>{item.friendlyTitle}</span>
              <ChevronRight size={14} color={active?'#7567e8':'#a2abba'}/>
            </Link>
          })}
        </div>
      </aside>
    </div>
  );
}

function Learn({ point }: { point: Module2Subpoint }) {
  return <div style={{display:'grid',gap:15}}>
    <section className="content-card" style={{padding:25,background:'#f5f3ff',display:'grid',gridTemplateColumns:'46px minmax(0,1fr)',gap:15,alignItems:'start'}}>
      <div className="section-icon lavender"><BookOpen size={21}/></div>
      <div><span className="content-kicker">The key idea</span><h2 style={{fontSize:23,margin:'5px 0 8px'}}>{point.keyIdea}</h2><p style={{margin:0,fontSize:14}}>Get this idea clear first. The detail underneath will make much more sense once you know what the section is really about.</p></div>
    </section>

    <section style={{display:'grid',gridTemplateColumns:'minmax(0,1.15fr) minmax(270px,.85fr)',gap:15,alignItems:'stretch'}}>
      <div style={{display:'grid',gap:15}}>
        {point.sections.map((section,i) => <section className="content-card" key={section.heading} style={{padding:22}}>
          <span style={{fontSize:10,fontWeight:850,color:'#8a96aa'}}>0{i+1}</span>
          <h2 style={{fontSize:19,margin:'5px 0 8px'}}>{section.heading}</h2>
          <p style={{fontSize:13.5,marginBottom:section.bullets?12:0}}>{section.body}</p>
          {section.bullets && <div style={{display:'grid',gap:7}}>{section.bullets.map(b=><div key={b} style={{display:'grid',gridTemplateColumns:'8px 1fr',gap:9,alignItems:'start',fontSize:13,color:'#52617f'}}><span style={{width:6,height:6,borderRadius:'50%',background:'#7567e8',marginTop:7}}></span><span>{b}</span></div>)}</div>}
        </section>)}
      </div>
      <TopicVisual type={point.visual}/>
    </section>

    <section className="content-card" style={{padding:24}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}><Beaker size={21} color="#7567e8"/><div><span className="content-kicker">Worked example</span><h2 style={{fontSize:20,margin:0}}>{point.exampleTitle}</h2></div></div>
      <div style={{display:'grid',gap:8}}>{point.example.map((line,i)=><div key={line} style={{display:'grid',gridTemplateColumns:'31px minmax(0,1fr)',gap:10,alignItems:'center',padding:'10px 12px',border:'1px solid #edf0f5',borderRadius:11,background:'#fbfcff'}}><span style={{width:28,height:28,borderRadius:8,display:'grid',placeItems:'center',background:'#efedff',color:'#6254d8',fontWeight:850,fontSize:11}}>{i+1}</span><span style={{fontSize:13,color:'#465571'}}>{line}</span></div>)}</div>
    </section>

    <section className="content-card tip-card" style={{background:'#fff8df'}}><Lightbulb size={20}/><div><strong>Exam shortcut</strong><p>{point.tip}</p></div></section>
  </div>;
}

function TopicVisual({ type }: { type: Module2Subpoint['visual'] }) {
  const box: React.CSSProperties = {background:'#fff',border:'1px solid #e4e8f2',borderRadius:17,padding:20,minHeight:300,display:'flex',flexDirection:'column'};
  const node = (text:string,bg='#efedff') => <div style={{padding:'12px 10px',borderRadius:12,background:bg,border:'1px solid #e2e5f0',textAlign:'center',fontSize:12,fontWeight:800,color:'#43506a'}}>{text}</div>;

  if(type==='mole') return <div style={box}><span className="content-kicker">Mole map</span><h3>Everything passes through moles</h3><div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:8,alignItems:'center',margin:'auto 0'}}>{node('mass')}<strong>⇄</strong>{node('moles','#eaf9f5')}{node('particles')}<strong>⇄</strong>{node('moles','#eaf9f5')}{node('gas volume')}<strong>⇄</strong>{node('moles','#eaf9f5')}</div></div>;
  if(type==='formula') return <div style={box}><span className="content-kicker">Formula route</span><h3>mass → moles → ratio</h3><div style={{display:'grid',gap:9,margin:'auto 0'}}>{node('1 · masses or %')}{node('2 · divide by Ar','#f4f8ff')}{node('3 · divide by smallest','#eaf9f5')}{node('4 · whole-number ratio','#fff7df')}</div></div>;
  if(type==='hydrate') return <div style={box}><span className="content-kicker">Hydrate picture</span><h3>Salt + fixed water</h3><div style={{margin:'auto',textAlign:'center'}}><div style={{fontSize:28,fontWeight:850,color:'#6254d8'}}>CuSO₄·5H₂O</div><div style={{width:2,height:50,background:'#d9deea',margin:'12px auto'}}></div><div style={{display:'flex',gap:6,justifyContent:'center'}}>{[1,2,3,4,5].map(x=><span key={x} style={{width:35,height:35,borderRadius:'50%',background:'#e8f5ff',display:'grid',placeItems:'center',fontSize:10,fontWeight:800}}>H₂O</span>)}</div></div></div>;
  if(type==='concentration') return <div style={box}><span className="content-kicker">Solution map</span><h3>n = cV</h3><div style={{margin:'auto 0',display:'grid',gap:11}}>{node('25.0 cm³')}{node('÷ 1000','#fff7df')}{node('0.0250 dm³','#eaf9f5')}{node('× concentration → moles','#efedff')}</div></div>;
  if(type==='gas') return <div style={box}><span className="content-kicker">Ideal gas</span><div style={{margin:'auto',textAlign:'center'}}><div style={{fontSize:32,fontWeight:900,color:'#6254d8'}}>pV = nRT</div><p style={{fontSize:12,margin:'12px 0 0'}}>pressure · volume · moles · temperature</p><div style={{marginTop:18,padding:12,borderRadius:12,background:'#fff7df',fontSize:12,fontWeight:700}}>Temperature must be in kelvin</div></div></div>;
  if(type==='stoich') return <div style={box}><span className="content-kicker">Reaction route</span><h3>Given → moles → ratio → answer</h3><div style={{display:'grid',gap:9,margin:'auto 0'}}>{node('given quantity')}{node('convert to moles','#f4f8ff')}{node('balanced equation ratio','#eaf9f5')}{node('convert to target','#efedff')}</div></div>;
  if(type==='ions') return <div style={box}><span className="content-kicker">Particles in solution</span><h3>Follow the ions</h3><div style={{margin:'auto',display:'flex',gap:12,alignItems:'center',justifyContent:'center'}}><span style={{width:72,height:72,borderRadius:'50%',background:'#ffe9e2',display:'grid',placeItems:'center',fontSize:23,fontWeight:850,color:'#b45b47'}}>H⁺</span><span style={{fontSize:20}}>vs</span><span style={{width:72,height:72,borderRadius:'50%',background:'#e8f5ff',display:'grid',placeItems:'center',fontSize:21,fontWeight:850,color:'#397aaa'}}>OH⁻</span></div></div>;
  if(type==='strength') return <div style={box}><span className="content-kicker">Strength visual</span><h3>Complete vs partial dissociation</h3><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,margin:'auto 0'}}><div style={{padding:15,borderRadius:13,background:'#f3f2ff'}}><strong style={{fontSize:12}}>Strong acid</strong><p style={{fontSize:20,textAlign:'center',margin:'18px 0'}}>H⁺ &nbsp; A⁻<br/>H⁺ &nbsp; A⁻</p><small>mostly ions</small></div><div style={{padding:15,borderRadius:13,background:'#f7fbff'}}><strong style={{fontSize:12}}>Weak acid</strong><p style={{fontSize:20,textAlign:'center',margin:'18px 0'}}>HA &nbsp; HA<br/>H⁺ &nbsp; A⁻</p><small>mixture</small></div></div></div>;
  if(type==='neutralise') return <div style={box}><span className="content-kicker">Core ionic equation</span><div style={{margin:'auto',textAlign:'center',fontSize:19,fontWeight:850,color:'#4c5870'}}><span style={{color:'#b45b47'}}>H⁺</span> + <span style={{color:'#397aaa'}}>OH⁻</span><div style={{margin:'14px 0',color:'#9ba4b4'}}>↓</div><span style={{padding:'12px 18px',borderRadius:14,background:'#eaf9f5',color:'#348b7a'}}>H₂O</span></div></div>;
  if(type==='titration'||type==='practical') return <div style={box}><span className="content-kicker">Practical view</span><h3>{type==='titration'?'A titration measures delivered volume':'Measure → calculate → evaluate'}</h3><div style={{margin:'auto',position:'relative',width:170,height:210}}><div style={{position:'absolute',left:80,top:4,width:12,height:125,border:'2px solid #7c89a0',borderRadius:'4px 4px 7px 7px',background:'linear-gradient(to bottom,#eef6ff 0 60%,transparent 60%)'}}></div><div style={{position:'absolute',left:84,top:128,width:4,height:27,background:'#7c89a0'}}></div><div style={{position:'absolute',left:48,bottom:5,width:80,height:80,border:'2px solid #7c89a0',clipPath:'polygon(35% 0,65% 0,100% 100%,0 100%)',background:'linear-gradient(to top,#eeeaff 0 38%,transparent 38%)'}}></div></div></div>;
  return <div style={box}><span className="content-kicker">Calculation route</span><h3>Known → ratio → unknown</h3><div style={{display:'grid',gap:9,margin:'auto 0'}}>{node('known c + V')}{node('calculate moles','#eaf9f5')}{node('use equation ratio','#fff7df')}{node('find unknown c','#efedff')}</div></div>;
}

function PrototypePanel({icon,kicker,title,text}:{icon:React.ReactNode;kicker:string;title:string;text:string}){
  return <section className="content-card" style={{minHeight:290,padding:28,display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',background:'#fbfcff'}}><div className="section-icon lavender" style={{marginBottom:15}}>{icon}</div><span className="content-kicker">{kicker}</span><h2 style={{fontSize:25,maxWidth:620}}>{title}</h2><p style={{maxWidth:650}}>{text}</p><div style={{marginTop:8,display:'flex',gap:8,alignItems:'center',fontSize:12,color:'#8a95aa'}}><TriangleAlert size={15}/> Prototype structure only — final bank comes later.</div></section>;
}
