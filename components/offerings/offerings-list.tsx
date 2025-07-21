import { createClient } from "@/lib/supabase/server";
import { Button } from "../ui/button";
import Link from "next/link";
import { Table } from "@radix-ui/themes/components/index";

export default async function OfferingsList() {
  const supabase = await createClient();
  const { data: offerings } = await supabase
    .from('offerings')
    .select();

  console.log(offerings);

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
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          {/* <Table.ColumnHeaderCell># Products</Table.ColumnHeaderCell> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {offerings.map((offering) => (
          <Table.Row key={offering.id}>
            <Table.RowHeaderCell>{offering.offeringname}</Table.RowHeaderCell>
            <Table.Cell>{offering.offeringdescription}</Table.Cell>
            {/* <Table.Cell>Developer</Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </div>
}
