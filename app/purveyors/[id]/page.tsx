import { createClient } from "@/lib/supabase/server";

export default async function PurveyorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient();
  const { data: purveyor } = await supabase
    .from('purveyors')
    .select()
    .eq('id', id)
    .single();

  return (
    <div>
      <h1>{purveyor.purveyorname}</h1>
      <p>{purveyor.purveyorlink}</p>
    </div>
  )
}
