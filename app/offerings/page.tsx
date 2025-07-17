import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OfferingsList from "@/components/offerings/offerings-list";

export default async function OfferingsHomePage() {
  const supabase = await createClient();
    
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Offerings</h2>
      </div>
      <div>
        <OfferingsList />
      </div>
    </div>
  )
}
