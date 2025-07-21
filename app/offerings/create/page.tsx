import CreateOfferingForm from "@/components/offerings/create-offering-form";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function CreateOfferingPage() {
  const supabase = await createClient();
  const { data: purveyors } = await supabase.from("purveyors").select();

  console.log('purveyors', purveyors);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Offerings</h2>
      </div>
      <div>
        {
          purveyors && <CreateOfferingForm purveyors={purveyors} />
        }
      </div>
    </div>
  )
}
