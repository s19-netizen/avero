'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Brain, CircleCheck, FilePenLine, Lightbulb, Target, TriangleAlert } from "lucide-react";

const tabs = ["Learn", "Recall", "Practise", "Exam", "Master"] as const;
type Tab = typeof tabs[number];

type TopicSeed = {
  intro: string;
  bullets: string[];
  example: string;
  recall: [string,string][];
  practise: string[];
  exam: string;
  marks: string[];
  mistakes: string[];
};

const seeds: Record<string, TopicSeed> = {
  "2.1.3": {
    intro: "The mole is just chemistry's counting unit. Instead of counting atoms one by one, we count them in huge bundles called moles.",
    bullets: ["1 mole contains 6.02 × 10²³ particles.", "Use n = m ÷ M to move between mass and moles.", "Balanced equations give you mole ratios between reacting substances."],
    example: "18.0 g of water has Mr = 18.0, so n = 18.0 ÷ 18.0 = 1.00 mol.",
    recall: [["Avogadro constant","6.02 × 10²³ particles per mole"],["Moles from mass","n = m ÷ M"],["Molar mass","Mass of one mole, in g mol⁻¹"],["Stoichiometry","Using the balanced equation to compare reacting amounts"]],
    practise: ["Calculate the moles in 5.85 g of NaCl, Mr = 58.5.","How many molecules are present in 0.250 mol of CO₂?","2H₂ + O₂ → 2H₂O. How many moles of water form from 3.0 mol H₂ if oxygen is in excess?"],
    exam: "A sample contains 4.90 g of sulfuric acid, H₂SO₄, Mr = 98.0. Calculate the amount in moles and the number of H₂SO₄ molecules. [3 marks]",
    marks: ["n = 4.90 ÷ 98.0 = 0.0500 mol (1)","number = 0.0500 × 6.02 × 10²³ (1)","= 3.01 × 10²² molecules (1)"],
    mistakes: ["Using Ar instead of Mr for a compound.","Forgetting to use the balanced equation ratio.","Confusing moles with number of particles."]
  },
  "2.1.4": {
    intro: "Acids are proton donors. The useful trick is to follow where H⁺ ions go and to keep track of the reacting ratio.",
    bullets: ["Acids donate H⁺ ions; bases accept H⁺ ions.","Neutralisation forms a salt and usually water.","Titrations let you calculate an unknown concentration from a known one."],
    example: "HCl + NaOH → NaCl + H₂O. The ratio is 1:1, so equal moles of HCl and NaOH react.",
    recall: [["Acid","Proton donor"],["Base","Proton acceptor"],["Alkali","A soluble base"],["Neutralisation","Reaction in which H⁺ is removed by a base"]],
    practise: ["Write the ionic equation for neutralisation.","25.0 cm³ of 0.100 mol dm⁻³ HCl reacts with NaOH. Calculate the moles of HCl.","Explain why phenolphthalein can be used to detect a titration end point."],
    exam: "25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.150 mol dm⁻³ HCl. HCl and NaOH react 1:1. Calculate the NaOH concentration. [3 marks]",
    marks: ["moles HCl = 0.150 × 0.0200 = 0.00300 mol (1)","moles NaOH = 0.00300 mol (1)","concentration = 0.00300 ÷ 0.0250 = 0.120 mol dm⁻³ (1)"],
    mistakes: ["Using cm³ directly instead of converting to dm³.","Ignoring the mole ratio from the equation.","Calling every base an alkali."]
  },
  "2.1.5": {
    intro: "Redox is electron movement. Oxidation and reduction always happen together, so look for what loses electrons and what gains them.",
    bullets: ["Oxidation is loss of electrons.","Reduction is gain of electrons.","Oxidation numbers help you spot redox even when electrons are not written."],
    example: "Mg → Mg²⁺ + 2e⁻ is oxidation because magnesium loses two electrons.",
    recall: [["Oxidation","Loss of electrons"],["Reduction","Gain of electrons"],["OIL RIG","Oxidation Is Loss, Reduction Is Gain"],["Oxidising agent","Species that causes oxidation and is itself reduced"]],
    practise: ["State the oxidation number of sulfur in SO₄²⁻.","Write a half-equation for Cl₂ gaining electrons to form Cl⁻.","In Zn + Cu²⁺ → Zn²⁺ + Cu, identify the species oxidised and reduced."],
    exam: "Chlorine reacts with bromide ions: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂. Use oxidation numbers or electron transfer to explain why this is a redox reaction. [3 marks]",
    marks: ["Br⁻ is oxidised / loses electrons (1)","Cl₂ is reduced / gains electrons (1)","Oxidation and reduction occur together (1)"],
    mistakes: ["Reversing oxidation and reduction.","Forgetting that oxidation number belongs to one atom, not the whole ion.","Naming the oxidising agent as the substance that is oxidised."]
  },
  "2.2.1": {
    intro: "Electron structure explains a huge amount of chemistry. Where the electrons are tells you how atoms bond, react and form ions.",
    bullets: ["Electrons occupy shells and sub-shells with different energies.","Orbitals hold a maximum of two electrons with opposite spins.","Electronic configuration can be written using 1s, 2s, 2p and so on."],
    example: "Oxygen has 8 electrons: 1s² 2s² 2p⁴.",
    recall: [["Orbital","Region that can hold up to two electrons"],["s sub-shell","Contains one orbital"],["p sub-shell","Contains three orbitals"],["Electron configuration","A description of how electrons are arranged"]],
    practise: ["Write the electron configuration of sodium.","How many orbitals are present in a p sub-shell?","Write the electron configuration of Mg²⁺."],
    exam: "Write the full electron configuration of chlorine and use it to explain why chlorine commonly forms Cl⁻ ions. [3 marks]",
    marks: ["1s² 2s² 2p⁶ 3s² 3p⁵ (1)","chlorine gains one electron (1)","to achieve a full outer shell / stable configuration (1)"],
    mistakes: ["Treating a sub-shell as the same thing as an orbital.","Forgetting to remove electrons from the highest-energy level when forming positive ions.","Putting more than two electrons into one orbital."]
  },
  "2.2.2": {
    intro: "Bonding is really about attractions between charged particles. Once you know what is attracting what, structure and properties become much easier to explain.",
    bullets: ["Ionic bonding is electrostatic attraction between oppositely charged ions.","Covalent bonding is attraction between shared electrons and both nuclei.","Metallic bonding is attraction between positive ions and delocalised electrons."],
    example: "NaCl has a giant ionic lattice. Strong attractions act in all directions, so lots of energy is needed to melt it.",
    recall: [["Ionic bond","Electrostatic attraction between oppositely charged ions"],["Covalent bond","Shared pair of electrons attracted to both nuclei"],["Metallic bond","Attraction between positive metal ions and delocalised electrons"],["Intermolecular force","Attraction between separate molecules"]],
    practise: ["Explain why solid sodium chloride does not conduct electricity.","Explain why graphite conducts electricity.","Compare the melting points of methane and magnesium oxide."],
    exam: "Diamond and graphite are both forms of carbon. Explain why graphite conducts electricity but diamond does not. [4 marks]",
    marks: ["Graphite has one delocalised electron per carbon / mobile electrons (1)","these electrons can carry charge (1)","all four outer electrons in diamond are used in covalent bonds (1)","diamond therefore has no mobile charged particles (1)"],
    mistakes: ["Saying covalent bonds are weak when you mean intermolecular forces are weak.","Explaining conductivity using atoms instead of mobile charged particles.","Forgetting to link structure to the property asked for."]
  }
};

export function PlaceholderSpec({ code, title, previous, next }: { code: string; title: string; previous: string; next?: string }) {
  const [tab, setTab] = useState<Tab>("Learn");
  const [revealed, setRevealed] = useState<number | null>(null);
  const [showMarks, setShowMarks] = useState(false);
  const seed = useMemo(() => seeds[code] ?? seeds["2.1.3"], [code]);

  return <div className="page-wrap">
    <div className="breadcrumbs"><Link href="/subjects">Subjects</Link><span>›</span><Link href="/chemistry/ocr-a">OCR A Chemistry</Link><span>›</span><span>{code}</span></div>
    <header className="page-header"><div><span className="eyebrow">Module 2 · Foundations in chemistry</span><h1>{code} {title}</h1><p>Prototype content — enough to test what studying this topic actually feels like.</p></div></header>

    <div className="study-tabs">{tabs.map(t => <button key={t} onClick={() => setTab(t)} className={tab === t ? "study-tab active" : "study-tab"}>{t}</button>)}</div>

    <div className="tab-content">
      {tab === "Learn" && <>
        <section className="content-card hero-note"><div className="section-icon lavender"><BookOpen size={21}/></div><div><span className="content-kicker">Start here</span><h2>The big idea</h2><p>{seed.intro}</p></div></section>
        <section className="split-content"><div className="content-card"><span className="content-kicker">Know this</span><h3>Three things to get straight</h3><div className="steps">{seed.bullets.map((b,i)=><p key={b}><b>{i+1}.</b> {b}</p>)}</div></div><div className="content-card atom-visual" style={{minHeight:240}}><div className="atom-orbit orbit-one"></div><div className="atom-orbit orbit-two"></div><div className="nucleus"><b>{code.startsWith("2.2") ? "e⁻" : "A"}</b><b>{code.startsWith("2.2") ? "e⁻" : "B"}</b></div><span className="electron e1">e⁻</span><span className="electron e2">e⁻</span><span className="visual-caption">Simple topic visual for the prototype</span></div></section>
        <section className="content-card"><span className="content-kicker">Worked example</span><h2>See it once, then try it yourself</h2><p style={{fontSize:"1.05rem"}}>{seed.example}</p></section>
        <section className="content-card tip-card"><Lightbulb size={20}/><div><strong>How to use these notes</strong><p>Read the idea, cover it, then explain it back in your own words before moving to Recall. The final content can be expanded later without changing the page structure.</p></div></section>
      </>}

      {tab === "Recall" && <section><div className="section-title"><div><span className="content-kicker">Recall</span><h2>Can you remember it without looking?</h2></div><Brain size={24}/></div><div className="flash-grid">{seed.recall.map(([front,back],i)=><button className={revealed===i?"flash-card revealed":"flash-card"} onClick={()=>setRevealed(revealed===i?null:i)} key={front}><small>{revealed===i?"Answer":"Tap to reveal"}</small><strong>{revealed===i?back:front}</strong></button>)}</div></section>}

      {tab === "Practise" && <section><div className="section-title"><div><span className="content-kicker">Practise</span><h2>Try it with the notes closed</h2></div><FilePenLine size={24}/></div><div className="question-list">{seed.practise.map((q,i)=><div className="content-card question" key={q}><span className="q-number">{i+1}</span><div><p>{q}</p><textarea aria-label={`Answer question ${i+1}`} placeholder="Write your answer here…"/></div></div>)}</div><button className="primary-button">Check my answers</button></section>}

      {tab === "Exam" && <section><div className="section-title"><div><span className="content-kicker">Exam question</span><h2>Turn the topic into marks</h2></div><Target size={24}/></div><div className="content-card exam-question"><p>{seed.exam}</p><textarea aria-label="Exam answer" placeholder="Write a full exam-style answer…"/><button className="primary-button" onClick={()=>setShowMarks(!showMarks)}>{showMarks?"Hide walkthrough":"Show mark scheme + walkthrough"}</button></div>{showMarks&&<div className="content-card mark-scheme"><h3>Mark-by-mark walkthrough</h3>{seed.marks.map((m,i)=><div className="mark-row" key={m}><span>{i+1}</span><p>{m}</p></div>)}</div>}</section>}

      {tab === "Master" && <section><div className="section-title"><div><span className="content-kicker">Master</span><h2>Catch the mistakes before the exam does</h2></div><CircleCheck size={24}/></div><div className="split-content"><div className="content-card"><h3>Common mistakes</h3><ul className="mistake-list">{seed.mistakes.map(m=><li key={m}><TriangleAlert size={17}/><span>{m}</span></li>)}</ul></div><div className="content-card challenge-card"><span className="content-kicker">Mastery check</span><h3>Ready to test it?</h3><p>A short mixed check would sit here once the final question bank is written.</p><button className="primary-button">Start mastery check</button></div></div></section>}
    </div>

    <div className="prev-next"><Link href={previous} className="secondary-button"><ArrowLeft size={17}/> Previous</Link>{next?<Link href={next} className="primary-button">Next specification point <ArrowRight size={17}/></Link>:<Link href="/chemistry/ocr-a" className="primary-button">Back to specification <ArrowRight size={17}/></Link>}</div>
  </div>;
}
