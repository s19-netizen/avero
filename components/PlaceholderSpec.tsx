'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Brain, CircleCheck, FilePenLine, Lightbulb, Target, TriangleAlert } from "lucide-react";

const tabs = ["Learn", "Recall", "Practise", "Exam", "Master"] as const;
type Tab = typeof tabs[number];

type Section = { heading: string; text: string; bullets?: string[] };
type TopicSeed = {
  intro: string;
  focus: string;
  sections: Section[];
  exampleTitle: string;
  exampleSteps: string[];
  recall: [string,string][];
  practise: string[];
  exam: string;
  marks: string[];
  mistakes: string[];
  challenge: string;
};

const seeds: Record<string, TopicSeed> = {
  "2.1.3": {
    intro: "The mole sounds huge and abstract at first, but it is really just chemistry's counting unit. A dozen means 12. A mole means 6.02 × 10²³. Once you see it that way, most mole questions become a set of predictable conversions.",
    focus: "Move confidently between mass, moles, particles, gas volumes and reacting ratios.",
    sections: [
      { heading: "Start with the amount", text: "Amount of substance is measured in moles, mol. One mole contains the Avogadro constant, 6.02 × 10²³ particles. Those particles might be atoms, molecules, ions or formula units, so always read what the question is actually counting.", bullets: ["particles = moles × 6.02 × 10²³", "moles = particles ÷ 6.02 × 10²³"] },
      { heading: "Mass ↔ moles", text: "The equation you will use constantly is n = m ÷ M. Here n is amount in mol, m is mass in g and M is molar mass in g mol⁻¹. For a compound, add the relative atomic masses to get its relative formula mass before you start.", bullets: ["18.0 g H₂O = 1.00 mol because Mr(H₂O) = 18.0", "5.85 g NaCl = 0.100 mol because Mr(NaCl) = 58.5"] },
      { heading: "The balanced equation is a ratio", text: "Coefficients tell you the reacting mole ratio. In 2H₂ + O₂ → 2H₂O, 2 mol H₂ reacts with 1 mol O₂ to make 2 mol H₂O. Do not compare masses directly unless you have converted them to moles first.", bullets: ["convert given value to moles", "use the equation ratio", "convert the answer into the unit the question wants"] },
      { heading: "Concentration and gas volumes", text: "For solutions, use n = cV with V in dm³. For gases at room temperature and pressure, one mole occupies about 24.0 dm³, so n = gas volume ÷ 24.0 when the volume is in dm³." }
    ],
    exampleTitle: "A full reacting-mass example",
    exampleSteps: ["Question: 4.80 g of magnesium reacts with excess oxygen. 2Mg + O₂ → 2MgO. Find the mass of MgO formed.", "1. Moles Mg = 4.80 ÷ 24.3 = 0.1975 mol.", "2. The Mg:MgO ratio is 2:2, so moles MgO = 0.1975 mol.", "3. Mr(MgO) = 24.3 + 16.0 = 40.3.", "4. Mass MgO = 0.1975 × 40.3 = 7.96 g.", "The important habit: mass → moles → ratio → mass."],
    recall: [["Avogadro constant","6.02 × 10²³ particles per mole"],["Moles from mass","n = m ÷ M"],["Moles in solution","n = cV, with V in dm³"],["Gas molar volume at RTP","About 24.0 dm³ mol⁻¹"],["Stoichiometry","Using coefficients in a balanced equation as mole ratios"]],
    practise: ["Calculate the moles in 11.7 g NaCl, Mr = 58.5.","How many molecules are in 0.250 mol CO₂?","25.0 cm³ of 0.200 mol dm⁻³ NaOH contains how many moles?","2Al + 3Cl₂ → 2AlCl₃. How many moles of AlCl₃ form from 0.40 mol Al with excess chlorine?"],
    exam: "Calcium carbonate decomposes: CaCO₃(s) → CaO(s) + CO₂(g). A student heats 5.00 g CaCO₃. Calculate the volume of CO₂ produced at RTP. Mr(CaCO₃) = 100.0. [3 marks]",
    marks: ["moles CaCO₃ = 5.00 ÷ 100.0 = 0.0500 mol (1)","1:1 ratio, so moles CO₂ = 0.0500 mol (1)","volume = 0.0500 × 24.0 = 1.20 dm³ (1)"],
    mistakes: ["Using cm³ in n = cV without dividing by 1000.","Skipping the balanced-equation ratio.","Using Ar for a whole compound instead of Mr.","Rounding too early and losing accuracy."],
    challenge: "A 6.50 g sample of impure calcium carbonate produces 1.08 dm³ CO₂ at RTP. Work out the percentage purity of the sample."
  },
  "2.1.4": {
    intro: "Acid questions are much easier when you stop thinking of acids as mysterious liquids and follow the H⁺ ions. At this level, the key ideas are proton transfer, neutralisation, salt formation and calculations from titration data.",
    focus: "Understand acid-base reactions and use titration data without getting lost in the arithmetic.",
    sections: [
      { heading: "What makes an acid an acid?", text: "A Brønsted–Lowry acid is a proton donor. A base is a proton acceptor. An alkali is simply a base that dissolves in water. That distinction matters: every alkali is a base, but not every base is soluble enough to be called an alkali.", bullets: ["acid = H⁺ donor", "base = H⁺ acceptor", "alkali = soluble base"] },
      { heading: "Neutralisation", text: "The core ionic equation is H⁺(aq) + OH⁻(aq) → H₂O(l). The other ions can be spectators. With carbonates, you also make carbon dioxide: acid + carbonate → salt + water + carbon dioxide." },
      { heading: "Choosing the salt", text: "The acid tells you the negative ion in the salt. Hydrochloric acid makes chlorides, sulfuric acid makes sulfates and nitric acid makes nitrates. The metal or ammonium part usually comes from the base, carbonate or alkali." },
      { heading: "Titrations without panic", text: "A titration calculation is just a mole calculation with accurate volumes. Convert cm³ to dm³, find moles of the known solution, use the balanced equation ratio, then divide by the unknown volume to find concentration.", bullets: ["moles = concentration × volume in dm³", "use the mole ratio", "concentration = moles ÷ volume in dm³"] }
    ],
    exampleTitle: "Titration walkthrough",
    exampleSteps: ["25.0 cm³ NaOH is neutralised by 20.0 cm³ of 0.150 mol dm⁻³ HCl.", "1. Convert 20.0 cm³ to 0.0200 dm³.", "2. Moles HCl = 0.150 × 0.0200 = 0.00300 mol.", "3. HCl + NaOH → NaCl + H₂O, so the ratio is 1:1.", "4. Moles NaOH = 0.00300 mol.", "5. Convert 25.0 cm³ to 0.0250 dm³.", "6. Concentration NaOH = 0.00300 ÷ 0.0250 = 0.120 mol dm⁻³."],
    recall: [["Acid","Proton donor"],["Base","Proton acceptor"],["Alkali","A soluble base"],["Neutralisation ionic equation","H⁺ + OH⁻ → H₂O"],["Titration","Method for finding an unknown concentration using a measured reacting volume"]],
    practise: ["Write the ionic equation for hydrochloric acid reacting with sodium hydroxide.","Name the salt made from nitric acid and magnesium oxide.","Calculate moles in 25.0 cm³ of 0.100 mol dm⁻³ HCl.","Explain why a pipette is used rather than a measuring cylinder for the fixed solution volume in a titration."],
    exam: "25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.150 mol dm⁻³ HCl. HCl and NaOH react 1:1. Calculate the NaOH concentration. [3 marks]",
    marks: ["moles HCl = 0.150 × 0.0200 = 0.00300 mol (1)","moles NaOH = 0.00300 mol from the 1:1 ratio (1)","concentration = 0.00300 ÷ 0.0250 = 0.120 mol dm⁻³ (1)"],
    mistakes: ["Using cm³ directly in n = cV.","Calling every base an alkali.","Forgetting the reacting ratio for diprotic acids such as H₂SO₄.","Choosing the wrong salt name because the acid was ignored."],
    challenge: "25.0 cm³ of H₂SO₄ reacts exactly with 32.4 cm³ of 0.150 mol dm⁻³ NaOH. Calculate the concentration of H₂SO₄."
  },
  "2.1.5": {
    intro: "Redox is a story about electrons. One species loses electrons while another gains them. Oxidation numbers are a bookkeeping system that lets you spot that electron movement even when the electrons are hidden inside a full equation.",
    focus: "Recognise oxidation and reduction, assign oxidation numbers and build half-equations.",
    sections: [
      { heading: "OIL RIG — but understand it", text: "Oxidation Is Loss of electrons. Reduction Is Gain of electrons. These always happen together because an electron lost by one species has to end up somewhere else." },
      { heading: "Oxidation numbers", text: "Elements on their own have oxidation number 0. A simple ion has the same oxidation number as its charge. Oxygen is usually −2 and hydrogen is usually +1. The total oxidation numbers add up to the overall charge on the species.", bullets: ["Na in Na⁺ = +1", "O in H₂O = −2", "S in SO₄²⁻ = +6 because S + 4(−2) = −2"] },
      { heading: "Spotting redox", text: "If an oxidation number increases, that element has been oxidised. If it decreases, it has been reduced. This gives you a reliable method when the equation does not show electrons directly." },
      { heading: "Half-equations", text: "A half-equation isolates one electron-transfer change. Put electrons on the side that makes the total charge balance. For example, Mg → Mg²⁺ + 2e⁻ shows oxidation, while Cl₂ + 2e⁻ → 2Cl⁻ shows reduction." }
    ],
    exampleTitle: "Follow the electrons",
    exampleSteps: ["Reaction: Zn + Cu²⁺ → Zn²⁺ + Cu", "Zn starts at oxidation number 0 and ends at +2, so zinc is oxidised.", "Cu starts at +2 and ends at 0, so copper ions are reduced.", "Oxidation half-equation: Zn → Zn²⁺ + 2e⁻", "Reduction half-equation: Cu²⁺ + 2e⁻ → Cu", "The electrons cancel when the half-equations are combined."],
    recall: [["Oxidation","Loss of electrons / increase in oxidation number"],["Reduction","Gain of electrons / decrease in oxidation number"],["Oxidising agent","Causes oxidation and is itself reduced"],["Reducing agent","Causes reduction and is itself oxidised"],["Element in its standard form","Oxidation number 0"]],
    practise: ["State the oxidation number of sulfur in SO₄²⁻.","State the oxidation number of nitrogen in NH₄⁺.","Write a half-equation for Cl₂ forming Cl⁻.","In Zn + Cu²⁺ → Zn²⁺ + Cu, identify the oxidising agent."],
    exam: "Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂. Explain, using electron transfer or oxidation numbers, why this is a redox reaction. [3 marks]",
    marks: ["Br⁻ is oxidised / loses electrons / oxidation number increases from −1 to 0 (1)","Cl₂ is reduced / gains electrons / oxidation number decreases from 0 to −1 (1)","oxidation and reduction happen together (1)"],
    mistakes: ["Saying the oxidising agent is the species that gets oxidised.","Forgetting that a free element has oxidation number 0.","Balancing atoms but not charge in half-equations.","Treating the charge on a polyatomic ion as the oxidation number of every atom in it."],
    challenge: "Use oxidation numbers to identify what is oxidised and reduced in 2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻, then write both half-equations."
  },
  "2.2.1": {
    intro: "Electron structure is the bridge between atomic structure and almost everything that comes later. The way electrons fill shells, sub-shells and orbitals helps explain ions, bonding, periodic trends and reactivity.",
    focus: "Read and write electron configurations and understand what shells, sub-shells and orbitals actually mean.",
    sections: [
      { heading: "Shells, sub-shells and orbitals", text: "A shell is a main energy level. Within shells are sub-shells such as s and p. A sub-shell is made of orbitals, and each orbital can hold a maximum of two electrons with opposite spins.", bullets: ["s sub-shell = 1 orbital = up to 2 electrons", "p sub-shell = 3 orbitals = up to 6 electrons"] },
      { heading: "The filling order", text: "For the early elements you will mostly use 1s, 2s, 2p, 3s, 3p and 4s. Electrons fill lower-energy orbitals first. Within a set of p orbitals, electrons occupy separate orbitals before pairing up." },
      { heading: "Writing configurations", text: "The superscript tells you how many electrons are in that sub-shell. Oxygen has 8 electrons, so its configuration is 1s² 2s² 2p⁴. Sodium has 11 electrons: 1s² 2s² 2p⁶ 3s¹." },
      { heading: "Ions", text: "For positive ions, remove electrons from the outermost occupied shell. For negative ions, add electrons. Mg is 1s² 2s² 2p⁶ 3s², but Mg²⁺ is 1s² 2s² 2p⁶." }
    ],
    exampleTitle: "Build chlorine's configuration",
    exampleSteps: ["Chlorine has atomic number 17, so a neutral chlorine atom has 17 electrons.", "1s² uses 2 electrons → 15 left.", "2s² uses 2 → 13 left.", "2p⁶ uses 6 → 7 left.", "3s² uses 2 → 5 left.", "The final five go into 3p: 3p⁵.", "Full configuration: 1s² 2s² 2p⁶ 3s² 3p⁵."],
    recall: [["Orbital","Region that can hold up to two electrons with opposite spin"],["s sub-shell","1 orbital; maximum 2 electrons"],["p sub-shell","3 orbitals; maximum 6 electrons"],["Electron configuration","Notation showing how electrons are arranged in sub-shells"],["Cl⁻ configuration","1s² 2s² 2p⁶ 3s² 3p⁶"]],
    practise: ["Write the full electron configuration of sodium.","How many orbitals are in a p sub-shell?","Write the full electron configuration of Mg²⁺.","Draw an orbital-box diagram for 2p⁴, showing how the four electrons are arranged."],
    exam: "Write the full electron configuration of chlorine and explain why chlorine commonly forms Cl⁻ ions. [3 marks]",
    marks: ["1s² 2s² 2p⁶ 3s² 3p⁵ (1)","chlorine gains one electron (1)","giving a full outer shell / stable noble-gas configuration (1)"],
    mistakes: ["Treating a sub-shell and an orbital as the same thing.","Putting more than two electrons in one orbital.","Pairing p electrons too early instead of filling separate orbitals first.","Removing electrons from the wrong shell when making a positive ion."],
    challenge: "Write the full configurations for Ca and Ca²⁺, then explain exactly which electrons are removed when the ion forms."
  },
  "2.2.2": {
    intro: "Bonding questions become much easier when you ask one question: what charged particles are attracting each other? From there you can explain structure, melting point, conductivity, solubility and lots of the properties OCR likes to test.",
    focus: "Connect ionic, covalent and metallic bonding to real structures and physical properties.",
    sections: [
      { heading: "Ionic bonding", text: "Ionic bonding is the electrostatic attraction between oppositely charged ions. Ionic compounds form giant lattices, so there are strong attractions acting in all directions. That is why they usually have high melting points.", bullets: ["solid ionic compound: ions fixed, so it does not conduct", "molten or aqueous ionic compound: ions can move, so it can conduct"] },
      { heading: "Covalent bonding", text: "A covalent bond is a shared pair of electrons attracted to both bonded nuclei. Simple molecules have strong covalent bonds inside each molecule but much weaker intermolecular forces between molecules, so many have low melting and boiling points." },
      { heading: "Giant covalent structures", text: "Diamond, graphite and silicon dioxide are not simple molecules. They contain huge networks of covalent bonds. Diamond is hard because every carbon is strongly bonded in a 3D network. Graphite has layers and one delocalised electron per carbon, so it conducts electricity." },
      { heading: "Metallic bonding", text: "Metals contain positive ions in a lattice surrounded by delocalised electrons. The electrostatic attraction between the ions and electrons holds the structure together. The mobile electrons also explain electrical conductivity." }
    ],
    exampleTitle: "Structure → property → explanation",
    exampleSteps: ["Question: Why does magnesium oxide have a much higher melting point than methane?", "MgO has a giant ionic lattice containing Mg²⁺ and O²⁻ ions.", "There are strong electrostatic attractions between oppositely charged ions throughout the lattice.", "A lot of energy is needed to overcome these attractions.", "Methane is simple molecular. Only weak intermolecular forces need to be overcome when it melts.", "Notice that we did not say 'covalent bonds in methane are weak' — they are not the forces being overcome during melting."],
    recall: [["Ionic bond","Electrostatic attraction between oppositely charged ions"],["Covalent bond","Shared pair of electrons attracted to both nuclei"],["Metallic bond","Attraction between positive metal ions and delocalised electrons"],["Simple molecular melting","Weak intermolecular forces are overcome"],["Why graphite conducts","It has mobile delocalised electrons"]],
    practise: ["Explain why solid NaCl does not conduct but molten NaCl does.","Explain why graphite conducts electricity but diamond does not.","Compare the melting points of methane and magnesium oxide.","Explain why metals can conduct electricity in the solid state."],
    exam: "Diamond and graphite are both forms of carbon. Explain why graphite conducts electricity but diamond does not. [4 marks]",
    marks: ["graphite has one delocalised/mobile electron per carbon (1)","these electrons can move through the structure and carry charge (1)","all four outer electrons of each carbon in diamond are used in covalent bonds (1)","diamond has no mobile charged particles / no delocalised electrons (1)"],
    mistakes: ["Saying covalent bonds are weak when the question is really about intermolecular forces.","Explaining conductivity without mentioning mobile charged particles.","Calling ionic compounds 'molecules'.", "Describing a property without linking it back to bonding and structure."],
    challenge: "Compare the structure, bonding, melting point and electrical conductivity of sodium chloride, graphite and magnesium."
  }
};

export function PlaceholderSpec({ code, title, previous, next }: { code: string; title: string; previous: string; next?: string }) {
  const [tab, setTab] = useState<Tab>("Learn");
  const [revealed, setRevealed] = useState<number | null>(null);
  const [showMarks, setShowMarks] = useState(false);
  const seed = useMemo(() => seeds[code] ?? seeds["2.1.3"], [code]);

  return <div className="page-wrap">
    <div className="breadcrumbs"><Link href="/subjects">Subjects</Link><span>›</span><Link href="/chemistry/ocr-a">OCR A Chemistry</Link><span>›</span><span>{code}</span></div>
    <header className="page-header"><div><span className="eyebrow">Module 2 · Foundations in chemistry</span><h1>{code} {title}</h1><p>{seed.focus}</p></div></header>

    <div className="study-tabs">{tabs.map(t => <button key={t} onClick={() => setTab(t)} className={tab === t ? "study-tab active" : "study-tab"}>{t}</button>)}</div>

    <div className="tab-content">
      {tab === "Learn" && <>
        <section className="content-card hero-note"><div className="section-icon lavender"><BookOpen size={21}/></div><div><span className="content-kicker">Start here</span><h2>The idea before the detail</h2><p>{seed.intro}</p></div></section>
        <TopicVisual code={code}/>
        {seed.sections.map((section, index) => <section className="content-card" key={section.heading}>
          <span className="content-kicker">{index === 0 ? "Core idea" : `Part ${index + 1}`}</span>
          <h2>{section.heading}</h2>
          <p>{section.text}</p>
          {section.bullets && <div className="steps">{section.bullets.map((item, i) => <p key={item}><b>{i + 1}.</b> {item}</p>)}</div>}
        </section>)}
        <section className="content-card"><span className="content-kicker">Worked example</span><h2>{seed.exampleTitle}</h2><div className="steps">{seed.exampleSteps.map((step, i)=><p key={step}><b>{i + 1}.</b> {step}</p>)}</div></section>
        <section className="content-card tip-card"><Lightbulb size={20}/><div><strong>Use this page like a student, not a textbook</strong><p>Read one chunk, hide it, and explain the idea back to yourself. Then move into Recall or Practise. The final content can grow later without changing the study flow.</p></div></section>
      </>}

      {tab === "Recall" && <section><div className="section-title"><div><span className="content-kicker">Recall</span><h2>Can you remember it without looking?</h2></div><Brain size={24}/></div><div className="flash-grid">{seed.recall.map(([front,back],i)=><button className={revealed===i?"flash-card revealed":"flash-card"} onClick={()=>setRevealed(revealed===i?null:i)} key={front}><small>{revealed===i?"Answer":"Tap to reveal"}</small><strong>{revealed===i?back:front}</strong></button>)}</div></section>}

      {tab === "Practise" && <section><div className="section-title"><div><span className="content-kicker">Practise</span><h2>Try it with the notes closed</h2></div><FilePenLine size={24}/></div><div className="question-list">{seed.practise.map((q,i)=><div className="content-card question" key={q}><span className="q-number">{i+1}</span><div><p>{q}</p><textarea aria-label={`Answer question ${i+1}`} placeholder="Write your answer here…"/></div></div>)}</div><button className="primary-button">Check my answers</button></section>}

      {tab === "Exam" && <section><div className="section-title"><div><span className="content-kicker">Exam question</span><h2>Turn the topic into marks</h2></div><Target size={24}/></div><div className="content-card exam-question"><p>{seed.exam}</p><textarea aria-label="Exam answer" placeholder="Write a full exam-style answer…"/><button className="primary-button" onClick={()=>setShowMarks(!showMarks)}>{showMarks?"Hide walkthrough":"Show mark scheme + walkthrough"}</button></div>{showMarks&&<div className="content-card mark-scheme"><h3>Mark-by-mark walkthrough</h3>{seed.marks.map((m,i)=><div className="mark-row" key={m}><span>{i+1}</span><p>{m}</p></div>)}</div>}</section>}

      {tab === "Master" && <section><div className="section-title"><div><span className="content-kicker">Master</span><h2>Catch the mistakes before the exam does</h2></div><CircleCheck size={24}/></div><div className="split-content"><div className="content-card"><h3>Common mistakes</h3><ul className="mistake-list">{seed.mistakes.map(m=><li key={m}><TriangleAlert size={17}/><span>{m}</span></li>)}</ul></div><div className="content-card challenge-card"><span className="content-kicker">Challenge</span><h3>One level harder</h3><p>{seed.challenge}</p><button className="secondary-button">Attempt challenge</button></div></div></section>}
    </div>

    <div className="prev-next"><Link href={previous} className="secondary-button"><ArrowLeft size={17}/> Previous</Link>{next?<Link href={next} className="primary-button">Next specification point <ArrowRight size={17}/></Link>:<Link href="/chemistry/ocr-a" className="primary-button">Back to specification <ArrowRight size={17}/></Link>}</div>
  </div>;
}

function TopicVisual({ code }: { code: string }) {
  const shell = {background:'#fbfbff',border:'1px solid #e4e8f2',borderRadius:17,padding:22,minHeight:210,display:'grid',placeItems:'center'} as const;
  const pill = {padding:'12px 16px',borderRadius:14,border:'1px solid #dfe3ef',background:'#fff',fontWeight:800,color:'#172554'} as const;

  if (code === '2.1.3') return <section style={shell}><div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap',justifyContent:'center'}}><div style={pill}>mass (g)</div><ArrowRight/><div style={{...pill,background:'#eeecff'}}>moles</div><ArrowRight/><div style={pill}>particles / volume / concentration</div></div><small style={{color:'#7f8aa1'}}>Most calculations pass through moles in the middle.</small></section>;
  if (code === '2.1.4') return <section style={shell}><div style={{display:'grid',gridTemplateColumns:'90px 1fr',gap:18,alignItems:'end'}}><div style={{height:150,width:22,border:'3px solid #7567e8',borderTop:0,borderRadius:'0 0 8px 8px',margin:'0 auto',position:'relative'}}><div style={{position:'absolute',bottom:0,left:0,right:0,height:'58%',background:'#e7e4ff'}}/><div style={{position:'absolute',bottom:-18,left:7,width:4,height:18,background:'#7567e8'}}/></div><div style={{width:130,height:90,border:'3px solid #71d5c3',borderTop:'none',borderRadius:'0 0 28px 28px',position:'relative'}}><div style={{position:'absolute',bottom:0,left:0,right:0,height:'42%',background:'#e6faf5',borderRadius:'0 0 24px 24px'}}/></div></div><small style={{color:'#7f8aa1'}}>Burette delivers a measured volume into a known flask volume.</small></section>;
  if (code === '2.1.5') return <section style={shell}><div style={{display:'flex',alignItems:'center',gap:14}}><div style={{...pill,background:'#fff6d7'}}>Zn</div><div style={{textAlign:'center',fontWeight:800,color:'#7567e8'}}>2e⁻ →</div><div style={{...pill,background:'#eaf9f6'}}>Cu²⁺</div></div><div style={{display:'flex',gap:40,fontSize:12,color:'#6f7b91'}}><span>oxidised: loses electrons</span><span>reduced: gains electrons</span></div></section>;
  if (code === '2.2.1') return <section style={shell}><div><div style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}><strong style={{width:42}}>2p</strong>{['↑↓','↑','↑'].map((x,i)=><div key={i} style={{width:48,height:48,border:'2px solid #9f97ec',display:'grid',placeItems:'center',borderRadius:8,fontSize:18}}>{x}</div>)}</div><div style={{display:'flex',gap:10,alignItems:'center'}}><strong style={{width:42}}>2s</strong><div style={{width:48,height:48,border:'2px solid #71d5c3',display:'grid',placeItems:'center',borderRadius:8,fontSize:18}}>↑↓</div></div></div><small style={{color:'#7f8aa1'}}>Orbitals hold up to two electrons; p electrons spread out before pairing.</small></section>;
  return <section style={shell}><div style={{display:'grid',gridTemplateColumns:'repeat(4,46px)',gap:8}}>{['+','−','+','−','−','+','−','+','+','−','+','−'].map((x,i)=><div key={i} style={{width:46,height:46,borderRadius:12,display:'grid',placeItems:'center',fontWeight:900,background:x==='+'?'#eeecff':'#e9faf6',color:x==='+'?'#6557dc':'#398f80'}}>{x}</div>)}</div><small style={{color:'#7f8aa1'}}>A structure is a repeating arrangement of particles and attractions — not another atom diagram.</small></section>;
}
