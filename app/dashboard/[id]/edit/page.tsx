import { notFound } from 'next/navigation';
import { FormBuilder } from '@/components/form-builder/form-builder';
import { getFormById } from '@/lib/data/forms';

export default async function EditFormPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
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
