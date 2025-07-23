import { Button } from "../ui/button";
import Link from "next/link";
import { Table } from "@radix-ui/themes/components/index";
import { getOfferingList } from "@/dal/offering";

export default async function OfferingsList() {
  const offerings = await getOfferingList();

  if (!offerings || offerings.length === 0) {
    return <div>
      <p>No offerings found.</p>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/offerings/create">Create an offering</Link>
      </Button>
    </div>
  }

  return <div>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Purveyor</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {offerings.map((offering) => (
          <Table.Row key={offering.id}>
            <Table.Cell>{offering.offeringName}</Table.Cell>
            <Table.Cell>{offering.purveyorName}</Table.Cell>
            <Table.Cell>{offering.offeringDescription}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </div>
}
