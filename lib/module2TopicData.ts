export type LessonSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Module2Subpoint = {
  id: string;
  sourceTitle: string;
  friendlyTitle: string;
  summary: string;
  time: string;
  keyIdea: string;
  sections: LessonSection[];
  exampleTitle: string;
  example: string[];
  tip: string;
  visual: "mole" | "formula" | "hydrate" | "concentration" | "gas" | "stoich" | "practical" | "ions" | "strength" | "neutralise" | "titration" | "calculation";
};

export type Module2Topic = {
  code: string;
  title: string;
  description: string;
  accent: "purple" | "blue";
  previous: string;
  next: string;
  subpoints: Module2Subpoint[];
};

export const module2Topics: Record<string, Module2Topic> = {
  "2.1.3": {
    code: "2.1.3",
    title: "Amount of substance",
    description: "This is the calculation toolkit of chemistry: moles, formulae, gases, solutions and reacting quantities. Work through it in small pieces rather than trying to learn every equation at once.",
    accent: "purple",
    previous: "/chemistry/ocr-a/2-1-2",
    next: "/chemistry/ocr-a/2-1-4",
    subpoints: [
      {
        id: "mole-avogadro",
        sourceTitle: "The mole, Avogadro constant, molar mass, and molar gas volume",
        friendlyTitle: "The mole and Avogadro constant",
        summary: "What a mole actually means, and how mass, particles and gas volume connect to it.",
        time: "10 min",
        keyIdea: "A mole is a counting unit. One mole of any substance contains 6.02 × 10²³ specified particles.",
        sections: [
          { heading: "Why chemists use moles", body: "Atoms and molecules are far too small to count one by one. The mole lets us count an enormous number of particles by measuring something practical, such as mass or gas volume." },
          { heading: "Mass and moles", body: "The molar mass tells you the mass of one mole. Numerically it comes from Ar for an element or Mr for a substance.", bullets: ["moles, n = mass ÷ molar mass", "mass, m = moles × molar mass", "Keep mass in grams unless the question tells you otherwise."] },
          { heading: "Particles and moles", body: "Use the Avogadro constant when the question asks for atoms, molecules, ions or formula units. Always name the particle you are counting." }
        ],
        exampleTitle: "How many molecules are in 9.00 g of water?",
        example: ["Mr(H₂O) = 18.0", "n = 9.00 ÷ 18.0 = 0.500 mol", "molecules = 0.500 × 6.02 × 10²³", "= 3.01 × 10²³ molecules"],
        tip: "If the question jumps between mass and particles, go through moles in the middle.",
        visual: "mole"
      },
      {
        id: "empirical-molecular",
        sourceTitle: "Empirical and molecular formulae calculations",
        friendlyTitle: "Empirical and molecular formulae",
        summary: "Turn experimental masses or percentages into the simplest whole-number formula.",
        time: "12 min",
        keyIdea: "An empirical formula is the simplest whole-number ratio of atoms. A molecular formula is a whole-number multiple of it.",
        sections: [
          { heading: "The empirical formula method", body: "Treat each element separately, convert its mass or percentage to moles, then compare the mole amounts.", bullets: ["Write the mass or percentage for each element.", "Divide each by its Ar.", "Divide all answers by the smallest.", "Scale to whole numbers if needed."] },
          { heading: "From empirical to molecular", body: "Find the empirical formula mass, then compare it with the molecular Mr. The multiplier is Mr ÷ empirical formula mass." }
        ],
        exampleTitle: "A compound is 40.0% C, 6.7% H and 53.3% O",
        example: ["C: 40.0 ÷ 12.0 = 3.33", "H: 6.7 ÷ 1.0 = 6.7", "O: 53.3 ÷ 16.0 = 3.33", "Divide by 3.33 → 1 : 2 : 1, so empirical formula = CH₂O"],
        tip: "Do not round 1.5 to 2. Multiply every ratio by 2 instead.",
        visual: "formula"
      },
      {
        id: "hydrated-salts",
        sourceTitle: "Anhydrous and hydrated salts, water of crystallisation",
        friendlyTitle: "Hydrated salts",
        summary: "Use mass change to find how many water molecules are attached to each formula unit.",
        time: "10 min",
        keyIdea: "A hydrated salt contains water of crystallisation in a fixed ratio. Heating can remove this water to leave the anhydrous salt.",
        sections: [
          { heading: "Reading the formula", body: "CuSO₄·5H₂O means that every formula unit of copper(II) sulfate is associated with five water molecules in the crystal." },
          { heading: "Finding x in salt·xH₂O", body: "Use the mass lost on heating as the mass of water. Convert both the anhydrous salt and the water to moles, then find the simplest ratio." }
        ],
        exampleTitle: "A hydrate loses 1.80 g of water and leaves 3.19 g CuSO₄",
        example: ["n(H₂O) = 1.80 ÷ 18.0 = 0.100 mol", "n(CuSO₄) = 3.19 ÷ 159.5 = 0.0200 mol", "ratio salt : water = 0.0200 : 0.100 = 1 : 5", "formula = CuSO₄·5H₂O"],
        tip: "Mass lost is water only if the experiment has heated the hydrate to constant mass without decomposing the salt.",
        visual: "hydrate"
      },
      {
        id: "mass-gas-solutions",
        sourceTitle: "Calculations involving mass, gas volume, solution volume and concentration",
        friendlyTitle: "Mass, gases and solutions",
        summary: "Move confidently between moles, concentration, solution volume and gas volume.",
        time: "14 min",
        keyIdea: "Most quantitative chemistry questions are conversions into moles, followed by a reaction ratio, followed by a conversion out of moles.",
        sections: [
          { heading: "Solutions", body: "For concentration in mol dm⁻³ use n = cV, with volume in dm³.", bullets: ["1000 cm³ = 1 dm³", "cm³ ÷ 1000 = dm³", "c = n ÷ V"] },
          { heading: "Gas volumes", body: "At the conditions specified by your course, molar gas volume can be used to convert between amount and gas volume. Make sure you use the value and units expected in the question." },
          { heading: "The safest route", body: "Underline what you have been given and what you need. Convert the given quantity to moles before applying any equation ratio." }
        ],
        exampleTitle: "How many moles are in 25.0 cm³ of 0.200 mol dm⁻³ NaOH?",
        example: ["25.0 cm³ = 0.0250 dm³", "n = cV", "n = 0.200 × 0.0250", "= 5.00 × 10⁻³ mol"],
        tip: "The most common concentration error is using cm³ directly in n = cV.",
        visual: "concentration"
      },
      {
        id: "ideal-gas",
        sourceTitle: "Ideal gas equation (pV = nRT)",
        friendlyTitle: "The ideal gas equation",
        summary: "Use pressure, volume and temperature to calculate the amount of a gas.",
        time: "12 min",
        keyIdea: "pV = nRT links four measurable gas quantities. The chemistry is usually easy; the unit conversions are what catch people out.",
        sections: [
          { heading: "What each symbol means", body: "p is pressure, V is volume, n is amount in moles, R is the gas constant and T is temperature in kelvin." },
          { heading: "Units first", body: "Before substituting, convert every value into the units that match the value of R you are using.", bullets: ["Temperature: K = °C + 273", "Volume may need converting to m³", "Pressure may need converting to Pa"] },
          { heading: "Rearrange before substituting", body: "If you need n, write n = pV ÷ RT first. This makes the calculation much easier to check." }
        ],
        exampleTitle: "Finding moles from p, V and T",
        example: ["Write n = pV ÷ RT", "Convert the temperature to kelvin.", "Convert pressure and volume to the required SI units.", "Substitute once, then round only at the end."],
        tip: "Never use °C directly in pV = nRT.",
        visual: "gas"
      },
      {
        id: "stoichiometry-yield-economy",
        sourceTitle: "Stoichiometric relationships, percentage yield and atom economy",
        friendlyTitle: "Stoichiometry, yield and atom economy",
        summary: "Use balanced equations to predict amounts, then judge how efficient the reaction really was.",
        time: "15 min",
        keyIdea: "The balanced equation gives mole ratios. Percentage yield compares actual product with the theoretical amount; atom economy asks how much of the reactants end up in the desired product.",
        sections: [
          { heading: "Stoichiometric relationships", body: "Coefficients in a balanced equation are mole ratios, not mass ratios. Convert to moles before using them." },
          { heading: "Percentage yield", body: "percentage yield = actual yield ÷ theoretical yield × 100. A lower yield can result from incomplete reaction, side reactions or losses during separation." },
          { heading: "Atom economy", body: "Atom economy considers the equation itself: what fraction of the reactant atoms become the desired product? Higher atom economy usually means less waste." }
        ],
        exampleTitle: "Using a 2 : 1 mole ratio",
        example: ["Start from the amount of the known reactant in moles.", "Apply the coefficient ratio from the balanced equation.", "Calculate the theoretical product amount.", "Only then compare with the actual yield if asked."],
        tip: "Yield measures what happened in the experiment. Atom economy measures how wasteful the reaction equation is.",
        visual: "stoich"
      },
      {
        id: "sustainability",
        sourceTitle: "Benefits of high atom economy for sustainability",
        friendlyTitle: "Atom economy and sustainability",
        summary: "Connect efficient reaction design to waste, resources and environmental impact.",
        time: "6 min",
        keyIdea: "A high atom economy means a larger proportion of reactant atoms become the useful product, so fewer atoms become unwanted by-products.",
        sections: [
          { heading: "Why this matters", body: "Processes with high atom economy can reduce waste disposal, reduce raw-material demand and improve the sustainability of large-scale chemical manufacture." },
          { heading: "Do not confuse the measures", body: "A reaction can have high percentage yield but poor atom economy, because the reaction may still make large amounts of unwanted by-product." }
        ],
        exampleTitle: "Two routes to the same product",
        example: ["Route A gives 95% yield but produces a large salt by-product.", "Route B gives 90% yield with almost all reactant atoms in the desired product.", "The routes therefore need separate comparisons for yield and atom economy."],
        tip: "Sustainability answers are stronger when you link fewer by-products to less waste treatment and lower resource use.",
        visual: "stoich"
      },
      {
        id: "pag1",
        sourceTitle: "PAG 1: Moles determination - Determine chemical quantities through mass and gas volume measurements",
        friendlyTitle: "PAG 1 · Determining moles",
        summary: "See how mass and gas-volume measurements become chemical quantities in a practical investigation.",
        time: "12 min",
        keyIdea: "The calculation is only as good as the measurements. Practical chemistry asks you to connect apparatus, uncertainty and mole calculations.",
        sections: [
          { heading: "What the practical is testing", body: "You measure a physical quantity such as mass or gas volume, convert it to amount in moles, and use the result to determine another chemical quantity." },
          { heading: "Good measurements", body: "Choose apparatus with suitable precision, record all raw readings and repeat measurements where appropriate." },
          { heading: "Evaluation", body: "Think about gas loss, incomplete reaction, balance precision and whether the apparatus was sealed correctly." }
        ],
        exampleTitle: "A practical calculation route",
        example: ["Record the starting mass or gas-volume reading.", "Carry out the reaction and record the final reading.", "Find the change in the measured quantity.", "Convert that change to moles and apply the chemical relationship."],
        tip: "In practical questions, explain how an error changes the calculated result — not just that the result is 'less accurate'.",
        visual: "practical"
      }
    ]
  },
  "2.1.4": {
    code: "2.1.4",
    title: "Acids",
    description: "Acids is more than one neutralisation equation. Build it in order: recognise the particles, understand acid strength, write reactions, then use titration measurements quantitatively.",
    accent: "blue",
    previous: "/chemistry/ocr-a/2-1-3",
    next: "/chemistry/ocr-a/2-1-5",
    subpoints: [
      {
        id: "acids-alkalis-ions",
        sourceTitle: "Formulae of common acids and alkalis; H⁺ and OH⁻ ions",
        friendlyTitle: "Acids, alkalis and their ions",
        summary: "Recognise common formulae and understand what H⁺ and OH⁻ mean in aqueous solution.",
        time: "8 min",
        keyIdea: "Acidic aqueous solutions contain H⁺ ions; alkaline aqueous solutions contain OH⁻ ions.",
        sections: [
          { heading: "Common acids", body: "You should be comfortable recognising formulae such as HCl, HNO₃ and H₂SO₄ and identifying the anion that forms the salt." },
          { heading: "Common alkalis", body: "Soluble hydroxides such as NaOH and KOH release OH⁻ ions in water. An alkali is a soluble base, not simply another word for base." },
          { heading: "Writing ionic species", body: "Include charges carefully. H⁺ and OH⁻ are ions, so charge matters whenever you write an ionic equation." }
        ],
        exampleTitle: "Naming the salt",
        example: ["Hydrochloric acid forms chloride salts.", "Nitric acid forms nitrate salts.", "Sulfuric acid forms sulfate salts.", "So H₂SO₄ + NaOH forms sodium sulfate and water after balancing."],
        tip: "The acid tells you the negative ion in the salt.",
        visual: "ions"
      },
      {
        id: "strong-weak",
        sourceTitle: "Strong and weak acids (dissociation)",
        friendlyTitle: "Strong and weak acids",
        summary: "Understand acid strength as the extent of dissociation — not how concentrated the solution is.",
        time: "10 min",
        keyIdea: "A strong acid dissociates almost completely in water; a weak acid dissociates only partially and establishes an equilibrium.",
        sections: [
          { heading: "Strength is not concentration", body: "Strength describes how much the acid dissociates. Concentration describes how much acid is present per unit volume. A dilute strong acid and a concentrated weak acid are both possible." },
          { heading: "What the particles look like", body: "A strong acid solution contains mostly separated ions. A weak acid solution contains a mixture of undissociated acid molecules and ions." },
          { heading: "Equilibrium matters", body: "For a weak acid, dissociation is reversible. Removing H⁺ or changing conditions can shift the equilibrium." }
        ],
        exampleTitle: "HCl compared with a weak acid HA",
        example: ["HCl(aq) → H⁺(aq) + Cl⁻(aq)", "HA(aq) ⇌ H⁺(aq) + A⁻(aq)", "The single arrow represents essentially complete dissociation; the equilibrium arrow shows partial dissociation."],
        tip: "Never define a strong acid as 'an acid with lots of H⁺'. Say it dissociates completely or almost completely in water.",
        visual: "strength"
      },
      {
        id: "neutralisation",
        sourceTitle: "Neutralisation reactions",
        friendlyTitle: "Neutralisation reactions",
        summary: "Write full and ionic equations for acids reacting with bases, alkalis and related substances.",
        time: "10 min",
        keyIdea: "At the heart of acid–alkali neutralisation is H⁺(aq) + OH⁻(aq) → H₂O(l).",
        sections: [
          { heading: "Acid + alkali", body: "The products are a salt and water. Balance the full equation, add state symbols if needed, then remove spectator ions for the ionic equation." },
          { heading: "Other bases", body: "Acids can also react with metal oxides and carbonates. Carbonates produce carbon dioxide as well as salt and water." },
          { heading: "Spectator ions", body: "Spectator ions appear unchanged on both sides of an ionic equation and can be cancelled." }
        ],
        exampleTitle: "Hydrochloric acid + sodium hydroxide",
        example: ["HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)", "Split strong aqueous electrolytes into ions.", "Cancel Na⁺ and Cl⁻.", "H⁺(aq) + OH⁻(aq) → H₂O(l)"],
        tip: "Do not split solids, liquids or gases into ions when writing an ionic equation.",
        visual: "neutralise"
      },
      {
        id: "standard-solutions-titrations",
        sourceTitle: "Techniques for preparing standard solutions and acid-base titrations",
        friendlyTitle: "Standard solutions and titrations",
        summary: "Learn the practical sequence and why each piece of volumetric apparatus is used.",
        time: "14 min",
        keyIdea: "A titration measures the volume needed for exact reaction. Reliable results depend on precise volumetric technique.",
        sections: [
          { heading: "Preparing a standard solution", body: "Accurately weigh the solid, dissolve it, transfer quantitatively to a volumetric flask, rinse the original vessel into the flask, make up to the mark and mix thoroughly." },
          { heading: "Setting up a titration", body: "Use a pipette for the fixed aliquot in the conical flask and a burette for the solution whose delivered volume you need to measure." },
          { heading: "Getting concordant titres", body: "Use a rough titration to locate the endpoint, then repeat carefully until titres are close enough to be considered concordant. Average suitable concordant values rather than blindly averaging every result." }
        ],
        exampleTitle: "Why rinse with the solution?",
        example: ["A burette is first rinsed with the solution it will contain.", "Any remaining water would otherwise dilute that solution.", "Dilution would change its concentration and distort the calculated result."],
        tip: "Read a burette at eye level and record readings consistently to the precision expected for the apparatus.",
        visual: "titration"
      },
      {
        id: "titration-calculations",
        sourceTitle: "Titration calculations",
        friendlyTitle: "Titration calculations",
        summary: "Turn concentration and volume data into an unknown concentration or chemical quantity.",
        time: "14 min",
        keyIdea: "Every titration calculation follows the same backbone: known concentration and volume → known moles → equation ratio → unknown moles → unknown concentration.",
        sections: [
          { heading: "Step 1 · known moles", body: "Convert the known volume from cm³ to dm³, then use n = cV." },
          { heading: "Step 2 · equation ratio", body: "Use the balanced equation coefficients to find the amount of the unknown substance that reacted." },
          { heading: "Step 3 · unknown concentration", body: "Use c = n ÷ V with the unknown solution volume in dm³." }
        ],
        exampleTitle: "25.0 cm³ NaOH needs 20.0 cm³ of 0.150 mol dm⁻³ HCl",
        example: ["n(HCl) = 0.150 × 0.0200 = 0.00300 mol", "HCl : NaOH = 1 : 1, so n(NaOH) = 0.00300 mol", "c(NaOH) = 0.00300 ÷ 0.0250", "= 0.120 mol dm⁻³"],
        tip: "Write the balanced equation before doing the ratio. A perfect n = cV calculation can still be wrong if the stoichiometric ratio is wrong.",
        visual: "calculation"
      },
      {
        id: "pag2",
        sourceTitle: "PAG 2: Acid-base titration - Volumetric analysis to determine concentrations and molar masses",
        friendlyTitle: "PAG 2 · Acid–base titration",
        summary: "Connect accurate titration technique to concentration and molar-mass calculations.",
        time: "12 min",
        keyIdea: "Volumetric analysis combines precise apparatus with stoichiometry. The endpoint measurement becomes useful only when it is linked to the balanced equation.",
        sections: [
          { heading: "What you measure", body: "Record initial and final burette readings and use their difference as the titre. Repeat to obtain concordant results." },
          { heading: "What you calculate", body: "Use the known concentration and titre to calculate moles, apply the reaction ratio and then determine the unknown concentration or molar mass." },
          { heading: "How to evaluate", body: "Consider overshooting the endpoint, parallax, air bubbles in the burette tip, incomplete transfer and whether the chosen indicator gives a sharp endpoint." }
        ],
        exampleTitle: "From titre to an unknown",
        example: ["Choose concordant titres and calculate a mean.", "Convert the mean titre to dm³.", "Use n = cV for the known solution.", "Apply the equation ratio and solve for the unknown quantity."],
        tip: "A rough titre helps you find the endpoint, but it is normally not included in the final mean.",
        visual: "practical"
      }
    ]
  }
};

export function getModule2Topic(code: string) {
  return module2Topics[code];
}

export function getModule2Subpoint(code: string, id: string) {
  return module2Topics[code]?.subpoints.find((point) => point.id === id);
}
