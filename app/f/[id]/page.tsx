import { notFound } from 'next/navigation';
import { FormRenderer } from '@/components/form-submission/form-renderer';
import { getFormById } from '@/lib/data/forms';

export default function PublicFormPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const form = getFormById(id);

    if (!form) {
        notFound();
    }

    return (
        <div className="bg-background min-h-screen">
            <FormRenderer form={form} />
        </div>
    );
}
