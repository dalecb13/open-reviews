'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type CreateOfferingFormProps = {
  purveyors: {id: string, purveyorname: string}[]
}

const CreateOfferingForm: React.FC<CreateOfferingFormProps> = ({ purveyors }) => {
  const [offeringName, setOfferingName] = useState("");
  const [offeringDescription, setOfferingDescription] = useState("");
  const [purveyor, setPurveyor] = useState<{id: string, purveyorname: string}>(purveyors[0]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChoosePurveyor = (purveyorName: string) => {
    if (purveyors) {
      const purveyor = purveyors.find((purveyor: {id: string, purveyorname: string}) => purveyor.purveyorname === purveyorName);
      if (!purveyor) return;
      setPurveyor(purveyor);
    }
  };

  const handleCreateOffering = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (purveyor !== null) {
      try {
        const { error } = await supabase
          .from('offerings')
          .insert({
            offeringname: offeringName,
            offeringdescription: offeringDescription,
            purveyorid: purveyor.id
          })
          .select();
        if (error) throw error;
        // Update this route to redirect to an authenticated route. The user already has an active session.
        router.push("/offerings");
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleCreateOffering}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Purveyor</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {
                  !purveyor
                    ? <Button variant="outline" size="sm">
                        Choose a purveyor
                      </Button>
                  : <Button variant="outline" size="sm">
                      {purveyor.purveyorname}
                    </Button>
                }
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {
                  purveyors.map((purveyor: {id: string, purveyorname: string}) => (
                    <DropdownMenuItem
                      key={purveyor.id}
                      onSelect={() => handleChoosePurveyor(purveyor.purveyorname)}
                    >
                      {purveyor.purveyorname}
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="offeringName">Offering Name</Label>
            <Input
              id="offeringName"
              type="text"
              placeholder="MacBook Pro M2"
              required
              value={offeringName}
              onChange={(e) => setOfferingName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="offeringDescription">Description</Label>
            <Textarea
              id="offeringDescription"
              placeholder="Laptop with M2 chip"
              required
              value={offeringDescription}
              onChange={(e) => setOfferingDescription(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading || purveyors === null}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateOfferingForm
