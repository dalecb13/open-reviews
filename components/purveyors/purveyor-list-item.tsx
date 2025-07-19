'use client';

import { Table } from "@radix-ui/themes";
import React from "react";

type Purveyor = {
  id: string;
  purveyorname: string;
  purveyorlink: string;
}

const PurveyorListItem: React.FC<{ purveyor: Purveyor }> = ({ purveyor }) => {
  return (
    <Table.Row key={purveyor.id}>
      <Table.RowHeaderCell
        className="cursor-pointer"
        onClick={() => window.location.href = `/purveyors/${purveyor.id}`}
      >
        {purveyor.purveyorname}
      </Table.RowHeaderCell>
      <Table.Cell>{purveyor.purveyorlink}</Table.Cell>
    </Table.Row>
  )
}

export default PurveyorListItem;
