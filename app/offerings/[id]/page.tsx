import { getOfferingById } from "@/dal/offering";

export default async function OfferingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const offering = await getOfferingById(id);

  if (!offering) {
    return null;
  }

  return (
    <div>
      <h1>{offering.offeringName}</h1>
      <p>{offering.offeringDescription}</p>
      <p>{offering.purveyorName}</p>
    </div>
  )
}
