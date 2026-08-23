'use client';

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, ArrowRight, Beaker, BookOpen, Brain, Calculator,
  CheckCircle2, FilePenLine, FlaskConical, Lightbulb, RotateCcw,
  Target, TriangleAlert
} from "lucide-react";

const tabs = ["Learn", "Recall", "Practise", "Exam", "Master"] as const;
type Tab = typeof tabs[number];
type Topic = "moles" | "acids";

type Props = {
  code: string;
  title: string;
  topic: Topic;
  previous: string;
  next?: string;
};

const shell: React.CSSProperties = { maxWidth: 1120, margin: "0 auto", padding: "38px 46px 72px" };
const card: React.CSSProperties = { background: "#fff", border: "1px solid #e5e9f3", borderRadius: 18, boxShadow: "0 8px 26px rgba(39,50,89,.045)" };
const label: React.CSSProperties = { fontSize: 11, textTransform: "uppercase", letterSpacing: ".09em", fontWeight: 800, color: "#7567e8" };

export function Module2TopicPage({ code, title, topic, previous, next }: Props) {
  const [tab, setTab] = useState<Tab>("Learn");
  const [flash, setFlash] = useState<number | null>(null);
  const [marks, setMarks] = useState(false);
  const data = topic === "moles" ? moleData : acidData;

  return (
    <div style={shell}>
      <div className="breadcrumbs"><Link href="/subjects">Subjects</Link><span>›</span><Link href="/chemistry/ocr-a">OCR A Chemistry</Link><span>›</span><span>{code}</span></div>

      <header style={{ display: "flex", justifyContent: "space-between", gap: 28, alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <span style={label}>Module 2 · Foundations in chemistry</span>
          <h1 style={{ marginTop: 7, marginBottom: 8 }}>{code} {title}</h1>
          <p style={{ maxWidth: 720, marginBottom: 0, fontSize: 15 }}>{data.subtitle}</p>
        </div>
        <div style={{ ...card, padding: "13px 16px", minWidth: 170 }}>
          <span style={{ fontSize: 11, color: "#8390a7", display: "block" }}>Study target</span>
          <strong style={{ display: "block", marginTop: 4, fontSize: 14 }}>{data.target}</strong>
        </div>
      </header>

      <div className="study-tabs">{tabs.map(t => <button key={t} onClick={() => setTab(t)} className={tab === t ? "study-tab active" : "study-tab"}>{t}</button>)}</div>

      {tab === "Learn" && (topic === "moles" ? <MolesLearn /> : <AcidsLearn />)}
      {tab === "Recall" && <Recall cards={data.recall} open={flash} setOpen={setFlash} />}
      {tab === "Practise" && <Practice questions={data.practice} />}
      {tab === "Exam" && <Exam question={data.exam} marks={data.marks} show={marks} setShow={setMarks} />}
      {tab === "Master" && <Master mistakes={data.mistakes} checklist={data.checklist} />}

      <div className="prev-next" style={{ marginTop: 28 }}>
        <Link href={previous} className="secondary-button"><ArrowLeft size={17}/> Previous</Link>
        {next ? <Link href={next} className="primary-button">Next specification point <ArrowRight size={17}/></Link> : <Link href="/chemistry/ocr-a" className="primary-button">Back to specification <ArrowRight size={17}/></Link>}
      </div>
    </div>
  );
}

function MolesLearn() {
  return <div style={{ display: "grid", gap: 16 }}>
    <section style={{ ...card, padding: 26, background: "linear-gradient(135deg,#f4f2ff,#f8fbff 64%,#effaf7)" }}>
      <span style={label}>The idea that unlocks this topic</span>
      <h2 style={{ fontSize: 27, margin: "7px 0 9px" }}>A mole is just a chemist’s counting unit.</h2>
      <p style={{ maxWidth: 780, marginBottom: 0 }}>You would never count atoms one at a time, so chemistry uses a giant bundle instead. <strong>One mole contains 6.02 × 10²³ particles.</strong> Once you know how many moles you have, equations tell you how substances react with each other.</p>
    </section>

    <section style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 16 }}>
      <div style={{ ...card, padding: 24 }}>
        <span style={label}>The three routes you use most</span>
        <h2 style={{ margin: "7px 0 18px" }}>Your mole map</h2>
        <div style={{ display: "grid", gap: 11 }}>
          <FormulaRow from="mass (g)" formula="÷ Mr" to="moles" note="n = m ÷ Mr" />
          <FormulaRow from="moles" formula="× 6.02 × 10²³" to="particles" note="N = n × NA" />
          <FormulaRow from="moles" formula="÷ volume (dm³)" to="concentration" note="c = n ÷ V" />
        </div>
        <div style={{ marginTop: 18, padding: "13px 14px", borderRadius: 12, background: "#fff8df", color: "#6f5a21", fontSize: 13 }}><strong>Unit trap:</strong> concentrations use dm³. Divide cm³ by 1000 before using the equation.</div>
      </div>

      <div style={{ ...card, padding: 24 }}>
        <span style={label}>Visual shortcut</span>
        <h2 style={{ margin: "7px 0 18px" }}>Mass → moles → ratio → answer</h2>
        <div style={{ display: "grid", gap: 9 }}>
          {["1. Convert the number you were given into moles","2. Use the balanced equation ratio","3. Convert the new moles into what the question wants"].map((x,i)=><div key={x} style={{ display: "grid", gridTemplateColumns: "34px 1fr", gap: 10, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: 10, background: i===1?"#eaf9f5":"#efedff", color: i===1?"#348f7d":"#6456dc", display: "grid", placeItems: "center", fontWeight: 850 }}>{i+1}</span><span style={{ fontSize: 13, color: "#465571", lineHeight: 1.45 }}>{x}</span></div>)}
        </div>
      </div>
    </section>

    <section style={{ ...card, padding: 25 }}>
      <div style={{ display: "flex", gap: 11, alignItems: "center", marginBottom: 17 }}><Calculator size={21} color="#7567e8"/><div><span style={label}>Worked example</span><h2 style={{ margin: 0 }}>How much magnesium oxide forms?</h2></div></div>
      <p><strong>Question:</strong> 4.80 g of magnesium burns completely in oxygen. 2Mg + O₂ → 2MgO. Calculate the mass of MgO formed. Ar: Mg = 24.0, O = 16.0.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 16 }}>
        <Step n="1" title="Find Mg moles" body="4.80 ÷ 24.0 = 0.200 mol" />
        <Step n="2" title="Use the ratio" body="2Mg : 2MgO, so the ratio is 1 : 1" />
        <Step n="3" title="Find Mr of MgO" body="24.0 + 16.0 = 40.0" />
        <Step n="4" title="Back to mass" body="0.200 × 40.0 = 8.00 g" />
      </div>
    </section>

    <section style={{ ...card, padding: 22, display: "flex", gap: 13, background: "#f1fbf8" }}><Lightbulb size={21} color="#389681"/><div><strong>What to say to yourself in an exam</strong><p style={{ margin: "4px 0 0" }}>“Get to moles first.” That single habit prevents most stoichiometry questions from turning into guesswork.</p></div></section>
  </div>;
}

function AcidsLearn() {
  return <div style={{ display: "grid", gap: 16 }}>
    <section style={{ ...card, padding: 26, background: "linear-gradient(135deg,#eef9ff,#f8fbff 55%,#fff8e8)" }}>
      <span style={label}>Start with the particle</span>
      <h2 style={{ fontSize: 27, margin: "7px 0 9px" }}>Acid chemistry is really the story of H⁺.</h2>
      <p style={{ maxWidth: 800, marginBottom: 0 }}>An acid <strong>donates a proton, H⁺</strong>. A base <strong>accepts H⁺</strong>. If you can see where the proton starts and where it ends up, neutralisation, salts and titration calculations become much easier to follow.</p>
    </section>

    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ ...card, padding: 24 }}>
        <span style={label}>Reaction pattern</span>
        <h2 style={{ margin: "7px 0 16px" }}>What acids react with</h2>
        <Reaction left="acid + metal" right="salt + hydrogen" example="2HCl + Mg → MgCl₂ + H₂" />
        <Reaction left="acid + base" right="salt + water" example="HCl + NaOH → NaCl + H₂O" />
        <Reaction left="acid + carbonate" right="salt + water + CO₂" example="2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂" />
      </div>

      <div style={{ ...card, padding: 24 }}>
        <span style={label}>Tiny equation, huge importance</span>
        <h2 style={{ margin: "7px 0 18px" }}>Neutralisation</h2>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, minHeight: 112, background: "#f8faff", borderRadius: 15, border: "1px solid #edf0f7" }}>
          <Ion text="H⁺" bg="#ffe8e1" fg="#b75c46"/><strong>+</strong><Ion text="OH⁻" bg="#e8f5ff" fg="#3a78a8"/><strong>→</strong><Ion text="H₂O" bg="#eaf9f5" fg="#2f8c79" wide/>
        </div>
        <p style={{ fontSize: 13, margin: "14px 0 0" }}>This is the ionic equation behind strong acid–strong base neutralisation: <strong>H⁺(aq) + OH⁻(aq) → H₂O(l)</strong>.</p>
      </div>
    </section>

    <section style={{ ...card, padding: 25 }}>
      <div style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: 24, alignItems: "center" }}>
        <div style={{ minHeight: 250, borderRadius: 17, background: "#fbfcff", border: "1px solid #edf0f6", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "48%", top: 20, width: 10, height: 128, background: "#dbe3ee", borderRadius: 8 }}></div>
          <div style={{ position: "absolute", left: "calc(48% - 14px)", top: 38, width: 38, height: 72, border: "2px solid #7887a2", borderTop: 0, borderRadius: "0 0 18px 18px" }}></div>
          <div style={{ position: "absolute", left: "calc(48% - 26px)", bottom: 28, width: 76, height: 92, border: "2px solid #7887a2", clipPath: "polygon(34% 0,66% 0,100% 100%,0 100%)", background: "linear-gradient(to top,#edeaff 0 37%,transparent 37%)" }}></div>
          <span style={{ position: "absolute", left: 18, top: 22, fontSize: 11, color: "#7f8ba0" }}>burette</span>
          <span style={{ position: "absolute", right: 16, bottom: 28, fontSize: 11, color: "#7f8ba0" }}>conical flask</span>
        </div>
        <div>
          <span style={label}>Titrations</span>
          <h2 style={{ margin: "7px 0 12px" }}>You are measuring the exact reacting volume.</h2>
          <p>Put a known solution in the burette and a measured volume of the other solution in the flask. Add the burette solution until the indicator shows the end point.</p>
          <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
            <MiniCheck text="Use a pipette for the fixed flask volume." />
            <MiniCheck text="Record burette readings to 2 decimal places." />
            <MiniCheck text="Repeat until you get concordant titres." />
            <MiniCheck text="Then use c = n ÷ V with V in dm³." />
          </div>
        </div>
      </div>
    </section>

    <section style={{ ...card, padding: 25 }}>
      <span style={label}>Worked calculation</span>
      <h2 style={{ margin: "7px 0 12px" }}>25.0 cm³ NaOH needs 20.0 cm³ of 0.150 mol dm⁻³ HCl</h2>
      <p style={{ marginBottom: 15 }}>HCl + NaOH → NaCl + H₂O, so the mole ratio is 1 : 1.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        <Step n="1" title="Moles of HCl" body="0.150 × 0.0200 = 0.00300 mol" />
        <Step n="2" title="Use 1 : 1 ratio" body="NaOH = 0.00300 mol" />
        <Step n="3" title="Find concentration" body="0.00300 ÷ 0.0250 = 0.120 mol dm⁻³" />
      </div>
    </section>

    <section style={{ ...card, padding: 22, display: "flex", gap: 13, background: "#fff8df" }}><TriangleAlert size={21} color="#a37a1b"/><div><strong>Easy mark to lose</strong><p style={{ margin: "4px 0 0" }}>25.0 cm³ is <strong>0.0250 dm³</strong>, not 25.0 dm³. Convert volume before substituting into concentration equations.</p></div></section>
  </div>;
}

function FormulaRow({ from, formula, to, note }: { from:string; formula:string; to:string; note:string }) {
  return <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:9, alignItems:"center", padding:"12px 13px", border:"1px solid #edf0f6", borderRadius:13, background:"#fbfcff" }}><strong style={{fontSize:13}}>{from}</strong><span style={{padding:"5px 8px",borderRadius:8,background:"#efedff",color:"#6456dc",fontSize:11,fontWeight:800}}>{formula}</span><div><strong style={{fontSize:13}}>{to}</strong><small style={{display:"block",color:"#8a95aa",marginTop:2}}>{note}</small></div></div>;
}
function Step({ n,title,body }: { n:string; title:string; body:string }) { return <div style={{padding:15,border:"1px solid #e8ebf3",borderRadius:13,background:"#fbfcff"}}><span style={{width:26,height:26,borderRadius:8,background:"#7567e8",color:"white",display:"grid",placeItems:"center",fontSize:11,fontWeight:850,marginBottom:10}}>{n}</span><strong style={{display:"block",fontSize:13,marginBottom:5}}>{title}</strong><span style={{fontSize:12,color:"#65738c",lineHeight:1.5}}>{body}</span></div> }
function Reaction({ left,right,example }: { left:string; right:string; example:string }) { return <div style={{padding:"12px 0",borderTop:"1px solid #edf0f5"}}><div style={{display:"flex",alignItems:"center",gap:7,fontSize:12,fontWeight:800}}><span>{left}</span><ArrowRight size={14} color="#7567e8"/><span>{right}</span></div><small style={{display:"block",marginTop:5,color:"#8793a8"}}>{example}</small></div> }
function Ion({text,bg,fg,wide}:{text:string;bg:string;fg:string;wide?:boolean}) { return <span style={{minWidth:wide?58:46,height:46,padding:"0 10px",borderRadius:14,background:bg,color:fg,display:"grid",placeItems:"center",fontWeight:850}}>{text}</span> }
function MiniCheck({text}:{text:string}) { return <div style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:13,color:"#53617a"}}><CheckCircle2 size={16} color="#58b8a5" style={{marginTop:2,flex:"0 0 auto"}}/>{text}</div> }

function Recall({ cards, open, setOpen }: { cards:[string,string][]; open:number|null; setOpen:(n:number|null)=>void }) {
  return <section><div className="section-title"><div><span className="content-kicker">Recall</span><h2>Say it before you reveal it</h2></div><Brain size={24}/></div><div className="flash-grid">{cards.map(([front,back],i)=><button className={open===i?"flash-card revealed":"flash-card"} onClick={()=>setOpen(open===i?null:i)} key={front}><small>{open===i?"Answer":"Tap to reveal"}</small><strong>{open===i?back:front}</strong></button>)}</div></section>
}
function Practice({questions}:{questions:string[]}) { return <section><div className="section-title"><div><span className="content-kicker">Practise</span><h2>Try it without the notes</h2></div><FilePenLine size={24}/></div><div className="question-list">{questions.map((q,i)=><div className="content-card question" key={q}><span className="q-number">{i+1}</span><div><p>{q}</p><textarea aria-label={`Answer question ${i+1}`} placeholder="Write your answer here…"/></div></div>)}</div></section> }
function Exam({question,marks,show,setShow}:{question:string;marks:string[];show:boolean;setShow:(v:boolean)=>void}) { return <section><div className="section-title"><div><span className="content-kicker">Exam question</span><h2>Turn the method into marks</h2></div><Target size={24}/></div><div className="content-card exam-question"><p>{question}</p><textarea aria-label="Exam answer" placeholder="Write your full answer…"/><button className="primary-button" onClick={()=>setShow(!show)}>{show?"Hide walkthrough":"Show mark scheme + walkthrough"}</button></div>{show&&<div className="content-card mark-scheme">{marks.map((m,i)=><div className="mark-row" key={m}><span>{i+1}</span><p>{m}</p></div>)}</div>}</section> }
function Master({mistakes,checklist}:{mistakes:string[];checklist:string[]}) { return <section><div className="section-title"><div><span className="content-kicker">Master</span><h2>What secure understanding looks like</h2></div><CheckCircle2 size={24}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div className="content-card"><h3>Common mistakes</h3><ul className="mistake-list">{mistakes.map(x=><li key={x}><TriangleAlert size={17}/><span>{x}</span></li>)}</ul></div><div className="content-card"><h3>Before you move on, can you…</h3><div style={{display:"grid",gap:9,marginTop:14}}>{checklist.map(x=><MiniCheck key={x} text={x}/>)}</div></div></div></section> }

const moleData = {
  subtitle: "Moles, reacting quantities, concentration and gas calculations — taught as one connected method rather than a wall of equations.",
  target: "Get to moles first",
  recall: [["1 mole","6.02 × 10²³ particles"],["Moles from mass","n = m ÷ Mr"],["Concentration","c = n ÷ V"],["Molar gas volume at RTP","24.0 dm³ mol⁻¹"]] as [string,string][],
  practice: ["Calculate the amount in moles in 11.7 g of NaCl, Mr = 58.5.","How many molecules are in 0.250 mol CO₂?","What amount of gas is present in 600 cm³ at RTP?","2Al + 3Cl₂ → 2AlCl₃. How many moles of AlCl₃ form from 0.40 mol Al?"],
  exam: "Calcium carbonate reacts with hydrochloric acid: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Calculate the volume of CO₂ at RTP formed from 5.00 g CaCO₃. Mr(CaCO₃)=100.0. [4 marks]",
  marks: ["moles CaCO₃ = 5.00 ÷ 100.0 = 0.0500 mol (1)","1:1 ratio gives 0.0500 mol CO₂ (1)","volume = 0.0500 × 24.0 = 1.20 dm³ (1)","correct unit / sensible significant figures (1)"],
  mistakes: ["Trying to use a mass ratio instead of a mole ratio.","Forgetting to convert cm³ to dm³.","Using Mr upside down in n = m ÷ Mr."],
  checklist: ["move between mass and moles","use a balanced equation as a mole ratio","calculate concentration from moles and volume","use 24.0 dm³ mol⁻¹ for gases at RTP"]
};
const acidData = {
  subtitle: "Proton transfer, neutralisation, salts and titrations — with the reaction patterns and calculations shown side by side.",
  target: "Follow the H⁺",
  recall: [["Acid","proton donor"],["Base","proton acceptor"],["Alkali","a soluble base"],["Neutralisation ionic equation","H⁺ + OH⁻ → H₂O"]] as [string,string][],
  practice: ["Write the products of nitric acid reacting with calcium carbonate.","Write the ionic equation for neutralisation.","Calculate moles in 25.0 cm³ of 0.200 mol dm⁻³ HCl.","Explain why a conical flask is used rather than a measuring cylinder during a titration."],
  exam: "25.0 cm³ of NaOH is neutralised by 18.60 cm³ of 0.150 mol dm⁻³ H₂SO₄. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Calculate the concentration of NaOH. [4 marks]",
  marks: ["moles H₂SO₄ = 0.150 × 0.01860 = 0.00279 mol (1)","moles NaOH = 2 × 0.00279 = 0.00558 mol (1)","25.0 cm³ = 0.0250 dm³ (1)","c = 0.00558 ÷ 0.0250 = 0.223 mol dm⁻³ (1)"],
  mistakes: ["Calling every base an alkali.","Forgetting the stoichiometric ratio in titration calculations.","Using cm³ directly in c = n ÷ V."],
  checklist: ["define acids and bases using proton transfer","predict products for common acid reactions","write the neutralisation ionic equation","complete a titration calculation from volume to concentration"]
};
