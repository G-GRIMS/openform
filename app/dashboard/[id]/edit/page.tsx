import { notFound } from "next/navigation";
import { FormBuilder } from "@/components/form-builder/form-builder";
import { getFormById } from "@/lib/data/forms";

export default function EditFormPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = getFormById(id);

  if (!form) {
    notFound();
  }

  return (
    <div className="h-[calc(100vh-73px)] overflow-hidden">
      <FormBuilder initialForm={form} />
    </div>
  );
}
