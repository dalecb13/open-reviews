'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

export function CreatePurveyorForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [purveyorName, setPurveyorName] = useState("");
  const [purveyorLink, setPurveyorLink] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreatePurveyor = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('purveyors')
        .insert({
          purveyorname: purveyorName,
          purveyorlink: purveyorLink
        })
        .select();
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/purveyors");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleCreatePurveyor}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="purveyorName">Purveyor Name</Label>
            <Input
              id="purveyorName"
              type="text"
              placeholder="ABC Company"
              required
              value={purveyorName}
              onChange={(e) => setPurveyorName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              type="link"
              placeholder="https://abc.company"
              required
              value={purveyorLink}
              onChange={(e) => setPurveyorLink(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}