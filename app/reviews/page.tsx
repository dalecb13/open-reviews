import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getReviewList } from "@/dal/review";
import { Review } from "@/models/review.model";
import ReviewsList from "@/components/reviews/reviews-list";

export default async function ReviewsHomePage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const reviews: Review[] = await getReviewList();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <ReviewsList reviews={reviews} />
    </div>
  )
}
