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

export function SpecNavigator({ current }: { current?: string }) {
  const router = useRouter();
  return (
    <div style={{marginTop:18,paddingTop:16,borderTop:'1px solid #edf0f5'}}>
      <div style={{display:'flex',alignItems:'center',gap:7,color:'#7a86a0',fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
        <ListTree size={14}/> Jump to spec point
      </div>
      <select
        aria-label="Jump to specification point"
        value={current ?? ''}
        onChange={(event) => {
          const point = points.find((item) => item.code === event.target.value);
          if (point) router.push(point.href);
        }}
        style={{width:'100%',border:'1px solid #dfe3ef',background:'#fff',color:'#172554',borderRadius:10,padding:'9px 8px',fontSize:11,fontWeight:650,outline:'none'}}
      >
        <option value="">Choose a point…</option>
        {points.map((point) => (
          <option key={point.code} value={point.code}>{point.code} — {point.title}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => router.push('/chemistry/ocr-a')}
        style={{border:0,background:'transparent',padding:'8px 0 0',fontSize:11,fontWeight:750,color:'#6557dc'}}
      >
        View full specification →
      </button>
    </div>
  );
}
