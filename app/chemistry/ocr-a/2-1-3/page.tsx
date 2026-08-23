import { TopicOverview } from "@/components/TopicOverview";
import { getModule2Topic } from "@/lib/module2TopicData";

export default function AmountOfSubstancePage() {
  const topic = getModule2Topic("2.1.3");
  return <TopicOverview topic={topic} />;
}
