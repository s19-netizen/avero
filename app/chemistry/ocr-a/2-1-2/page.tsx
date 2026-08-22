import { SpecWorkspace } from "@/components/SpecWorkspace";
import { spec212 } from "@/lib/chemistry";

export default function FormulaeEquationsPage() {
  return <SpecWorkspace spec={spec212} contentKey="equations" previous="/chemistry/ocr-a/2-1-1" />;
}
