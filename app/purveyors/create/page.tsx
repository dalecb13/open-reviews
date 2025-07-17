import { CreatePurveyorForm } from "@/components/purveyors/create-purveyor-form";

export default async function CreatePurveyorPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Purveyors</h2>
      </div>
      <div>
        <CreatePurveyorForm />
      </div>
    </div>
  )
}
