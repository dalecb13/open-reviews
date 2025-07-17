import { createClient } from "@/lib/supabase/server";
import { Button } from "../ui/button";
import Link from "next/link";
import { Table } from "@radix-ui/themes/components/index";

export default async function PurveyorsList() {
  const supabase = await createClient();
  const { data: purveyors } = await supabase
    .from('purveyors')
    .select();

  console.log(purveyors);

  if (!purveyors || purveyors.length === 0) {
    return <div>
      <p>No purveyors found.</p>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/purveyors/create">Create a purveyor</Link>
      </Button>
    </div>
  }

  return <div>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Link</Table.ColumnHeaderCell>
          {/* <Table.ColumnHeaderCell># Products</Table.ColumnHeaderCell> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {purveyors.map((purveyor) => (
          <Table.Row key={purveyor.id}>
            <Table.RowHeaderCell>{purveyor.purveyorname}</Table.RowHeaderCell>
            <Table.Cell>{purveyor.purveyorlink}</Table.Cell>
            {/* <Table.Cell>Developer</Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </div>
}
