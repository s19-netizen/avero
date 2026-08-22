'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, BookOpen, FileText, Dumbbell, Layers3, ChartNoAxesColumnIncreasing, FlaskConical } from "lucide-react";
import { Wordmark } from "./Wordmark";

const nav = [
  ["Home", "/", Home],
  ["My Plan", "/plan", CalendarDays],
  ["Subjects", "/subjects", BookOpen],
  ["Past Papers", "/past-papers", FileText],
  ["Practice", "/practice", Dumbbell],
  ["Flashcards", "/flashcards", Layers3],
  ["Progress", "/progress", ChartNoAxesColumnIncreasing],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Wordmark />
        <nav className="side-nav">
          {nav.map(([label, href, Icon]) => {
            const active = href === "/" ? path === "/" : path.startsWith(href);
            return <Link key={href} href={href} className={active ? "nav-item active" : "nav-item"}><Icon size={19}/><span>{label}</span></Link>;
          })}
        </nav>
        <div className="course-shortcut">
          <div className="shortcut-icon"><FlaskConical size={18}/></div>
          <div><small>Current course</small><strong>Chemistry</strong><span>OCR A · A Level</span></div>
        </div>
      </aside>
      <main className="main-shell">{children}</main>
    </div>
  );
}
