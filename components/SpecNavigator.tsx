'use client';

import { useRouter } from "next/navigation";
import { ListTree } from "lucide-react";

const points = [
  { code: "2.1.1", title: "Atomic structure and isotopes", href: "/chemistry/ocr-a/2-1-1" },
  { code: "2.1.2", title: "Compounds, formulae and equations", href: "/chemistry/ocr-a/2-1-2" },
  { code: "2.1.3", title: "Amount of substance", href: "/chemistry/ocr-a/2-1-3" },
  { code: "2.1.4", title: "Acids", href: "/chemistry/ocr-a/2-1-4" },
  { code: "2.1.5", title: "Redox", href: "/chemistry/ocr-a/2-1-5" },
  { code: "2.2.1", title: "Electron structure", href: "/chemistry/ocr-a/2-2-1" },
  { code: "2.2.2", title: "Bonding and structure", href: "/chemistry/ocr-a/2-2-2" },
];

export function SpecNavigator({ current }: { current: string }) {
  const router = useRouter();
  return (
    <div className="spec-jump">
      <ListTree size={17} />
      <span>Jump to</span>
      <select
        aria-label="Jump to specification point"
        value={current}
        onChange={(event) => {
          const point = points.find((item) => item.code === event.target.value);
          if (point) router.push(point.href);
        }}
      >
        {points.map((point) => (
          <option key={point.code} value={point.code}>
            {point.code} — {point.title}
          </option>
        ))}
      </select>
    </div>
  );
}
