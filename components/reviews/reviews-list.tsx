import { Button } from "../ui/button";
import Link from "next/link";
import { Table } from "@radix-ui/themes/components/index";
import ReviewListItem from "./review-list-item";
import { Review } from "@/models/review.model";

type Props = {
  reviews: Review[]
}

const ReviewsList: React.FC<Props> = async ({ reviews }) => {

  if (!reviews || reviews.length === 0) {
    return <div>
      <p>No reviews found.</p>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/reviews/create">Write a review</Link>
      </Button>
    </div>
  }

  return <div>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Link</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {reviews.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </Table.Body>
    </Table.Root>
  </div>
}

export default ReviewsList;
