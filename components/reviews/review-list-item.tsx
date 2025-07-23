'use client';

import { Review } from "@/models/review.model";
import { Table } from "@radix-ui/themes";
import React from "react";

const ReviewListItem: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <Table.Row key={review.id}>
      <Table.Cell
        className="cursor-pointer hover:underline"
        onClick={() => window.location.href = `/reviews/${review.id}`}
      >
        {review.review}
      </Table.Cell>
      <Table.Cell>{review.id}</Table.Cell>
    </Table.Row>
  )
}

export default ReviewListItem;
