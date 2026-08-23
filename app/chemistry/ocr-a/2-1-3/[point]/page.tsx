import { notFound } from "next/navigation";
import { SubtopicLesson } from "@/components/SubtopicLesson";
import { getModule2Subpoint, getModule2Topic } from "@/lib/module2TopicData";

export default async function AmountSubpointPage({ params }: { params: Promise<{ point: string }> }) {
  const { point: pointId } = await params;
  const topic = getModule2Topic("2.1.3");
  const point = getModule2Subpoint("2.1.3", pointId);
  if (!topic || !point) notFound();
  return <SubtopicLesson topic={topic} point={point} />;
}
