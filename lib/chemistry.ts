export type SpecPoint = {
  code: string;
  title: string;
  summary: string;
  mastery: number;
  href?: string;
  status?: "active" | "placeholder";
};

export const modules = [
  { code: "1", title: "Development of practical skills in chemistry", mastery: 36 },
  { code: "2", title: "Foundations in chemistry", mastery: 62 },
  { code: "3", title: "Periodic table and energy", mastery: 28 },
  { code: "4", title: "Core organic chemistry", mastery: 18 },
  { code: "5", title: "Physical chemistry and transition elements", mastery: 8 },
  { code: "6", title: "Organic chemistry and analysis", mastery: 4 },
];

export const foundationPoints: SpecPoint[] = [
  { code: "2.1.1", title: "Atomic structure", summary: "Atoms, ions, isotopes and the particles inside them.", mastery: 78, href: "/chemistry/ocr-a/2-1-1", status: "active" },
  { code: "2.1.2", title: "Formulae and equations", summary: "Chemical formulae, balanced equations and ionic equations.", mastery: 44, href: "/chemistry/ocr-a/2-1-2", status: "active" },
  { code: "2.1.3", title: "Amount of substance", summary: "Moles, masses and reacting quantities.", mastery: 21, href: "/chemistry/ocr-a/2-1-3", status: "placeholder" },
  { code: "2.1.4", title: "Acids", summary: "Acids, bases, neutralisation and titration ideas.", mastery: 0, href: "/chemistry/ocr-a/2-1-4", status: "placeholder" },
  { code: "2.1.5", title: "Redox", summary: "Oxidation numbers and electron transfer.", mastery: 0, href: "/chemistry/ocr-a/2-1-5", status: "placeholder" },
];

export const spec211 = {
  code: "2.1.1",
  title: "Atomic structure",
  kicker: "Module 2 · Foundations in chemistry",
  wording: "Understand the structure of atoms and ions, including protons, neutrons and electrons, and use atomic and mass numbers to describe isotopes.",
  mastery: 78,
  questions: 34,
  mistakes: 3,
  review: "Tomorrow",
};

export const spec212 = {
  code: "2.1.2",
  title: "Formulae and equations",
  kicker: "Module 2 · Foundations in chemistry",
  wording: "Use chemical symbols, formulae and equations to represent substances and reactions, including balanced and ionic equations.",
  mastery: 44,
  questions: 18,
  mistakes: 6,
  review: "Today",
};
