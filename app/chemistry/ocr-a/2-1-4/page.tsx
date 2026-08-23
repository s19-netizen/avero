import { TopicOverview } from "@/components/TopicOverview";
import { getModule2Topic } from "@/lib/module2TopicData";

export default function AcidsPage() {
  const topic = getModule2Topic("2.1.4");
  return <TopicOverview topic={topic} />;
}
