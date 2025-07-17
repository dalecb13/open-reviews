import { createClient } from "@/lib/supabase/server";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function PurveyorsList() {
  const supabase = await createClient();
  const { data: purveyors } = await supabase
    .from('purveyors')
    .select();

  if (!purveyors || purveyors.length === 0) {
    return <div>
      <p>No purveyors found.</p>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/purveyors/create">Create a purveyor</Link>
      </Button>
    </div>
  }

  return <pre>{JSON.stringify(purveyors, null, 2)}</pre>
}
