'use client';

import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

type Offering = {
  id: string;
  offeringName: string;
  offeringDescription: string;
  purveyorName: string;
  purveyorId: string;
}

const OfferingListItem: React.FC<{ offering: Offering }> = ({ offering }) => {
  const router = useRouter();

  return (
    <Table.Row>
      <Table.Cell
        className="cursor-pointer hover:underline"
        onClick={() => router.push(`/offerings/${offering.id}`)}
      >
        {offering.offeringName}
      </Table.Cell>
      <Table.Cell
        className="cursor-pointer hover:underline"
        onClick={() => router.push(`/purveyors/${offering.purveyorId}`)}
      >
        {offering.purveyorName}
      </Table.Cell>
      <Table.Cell>{offering.offeringDescription}</Table.Cell>
    </Table.Row>
  )
}

export default OfferingListItem;
