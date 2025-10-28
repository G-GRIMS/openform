import React from 'react';
import { FormRenderer } from '@/components/form-submission/form-renderer';

export default function PublicFormPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = React.use(params);

    return (
        <div className="bg-background min-h-screen">
            <FormRenderer formId={id} />
        </div>
    );
}
