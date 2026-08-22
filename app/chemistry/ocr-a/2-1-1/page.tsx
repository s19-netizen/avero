import { SpecWorkspace } from "@/components/SpecWorkspace";
import { spec211 } from "@/lib/chemistry";

export default function AtomicStructurePage() {
  return <SpecWorkspace spec={spec211} contentKey="atomic" next="/chemistry/ocr-a/2-1-2" />;
}
