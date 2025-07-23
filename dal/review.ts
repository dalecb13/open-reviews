import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/models/profile.model";
import { Review } from "@/models/review.model";

export async function getReviewList() {
  const supabase = await createClient();
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select(`
      id,
      title,
      review,
      stars,
      profiles(id, username),
      createdat,
      updatedat
    `);

  if (error) {
    console.warn(error);
    throw error;
  }

  if (!reviews) {
    console.warn(error);
    return [];
  }

  const mappedReviews: Review[] = reviews.map((review) => {
    const profile = review.profiles as unknown as Profile;

    return {
      id: review.id,
      title: review.title,
      review: review.review,
      stars: review.stars,
      profile,
      createdAt: review.createdat,
      updatedAt: review.updatedat,
    }
  })

  return mappedReviews;
}