import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import type {
    Form,
    FormWithFields,
    CreateFormArgs,
    UpdateFormArgs,
    CreateFieldArgs,
    SubmitFormArgs,
    FormSubmission,
    FormAnalytics,
} from '@/types/form';

// Form hooks
export function useForms(status?: 'draft' | 'published' | 'archived') {
    const forms = useQuery(api.forms.get.getForms, {
        status,
        paginationOpts: { numItems: 50, cursor: null },
    });
    return forms;
}

export function useForm(formId: Id<'forms'>) {
    const form = useQuery(api.forms.get.getFormWithFields, { formId });
    return form;
}

export function usePublicForm(formId: Id<'forms'>) {
    const form = useQuery(api.forms.get.getPublicForm, { formId });
    return form;
}

export function useCreateForm() {
    const createForm = useMutation(api.forms.create.createForm);
    return createForm;
}

export function useUpdateForm() {
    const updateForm = useMutation(api.forms.update.updateForm);
    return updateForm;
}

export function usePublishForm() {
    const publishForm = useMutation(api.forms.update.publishForm);
    return publishForm;
}

export function useArchiveForm() {
    const archiveForm = useMutation(api.forms.update.archiveForm);
    return archiveForm;
}

export function useDeleteForm() {
    const deleteForm = useMutation(api.forms.delete.deleteForm);
    return deleteForm;
}

export function useDuplicateForm() {
    const duplicateForm = useMutation(api.forms.delete.duplicateForm);
    return duplicateForm;
}

// Field hooks
export function useCreateField() {
    const createField = useMutation(api.form_fields.create.createField);
    return createField;
}

export function useUpdateField() {
    const updateField = useMutation(api.form_fields.update.updateField);
    return updateField;
}

export function useReorderFields() {
    const reorderFields = useMutation(api.form_fields.update.reorderFields);
    return reorderFields;
}

export function useDeleteField() {
    const deleteField = useMutation(api.form_fields.delete.deleteField);
    return deleteField;
}

// Submission hooks
export function useSubmissions(
    formId: Id<'forms'>,
    status?: 'pending' | 'completed' | 'spam',
) {
    const submissions = useQuery(api.submissions.get.getSubmissions, {
        formId,
        status,
        paginationOpts: { numItems: 50, cursor: null },
    });
    return submissions;
}

export function useSubmission(submissionId: Id<'submissions'>) {
    const submission = useQuery(api.submissions.get.getSubmission, {
        submissionId,
    });
    return submission;
}

export function useSubmissionCount(formId: Id<'forms'>) {
    const count = useQuery(api.submissions.get.getSubmissionCount, { formId });
    return count;
}

export function useSubmitForm() {
    const submitForm = useMutation(api.submissions.create.submitForm);
    return submitForm;
}

// Analytics hooks
export function useFormMetrics(
    formId: Id<'forms'>,
    startDate?: string,
    endDate?: string,
) {
    const metrics = useQuery(api.analytics.get_metrics.getFormMetrics, {
        formId,
        startDate,
        endDate,
    });
    return metrics;
}

export function useFormInsights(formId: Id<'forms'>) {
    const insights = useQuery(api.analytics.get_metrics.getFormInsights, {
        formId,
    });
    return insights;
}

export function useTrackFormView() {
    const trackView = useMutation(api.analytics.track_view.trackFormView);
    return trackView;
}

// Utility hooks
export function useFormActions() {
    const createForm = useCreateForm();
    const updateForm = useUpdateForm();
    const publishForm = usePublishForm();
    const archiveForm = useArchiveForm();
    const deleteForm = useDeleteForm();
    const duplicateForm = useDuplicateForm();

    return {
        createForm,
        updateForm,
        publishForm,
        archiveForm,
        deleteForm,
        duplicateForm,
    };
}

export function useFieldActions() {
    const createField = useCreateField();
    const updateField = useUpdateField();
    const reorderFields = useReorderFields();
    const deleteField = useDeleteField();

    return {
        createField,
        updateField,
        reorderFields,
        deleteField,
    };
}

export function useSubmissionActions() {
    const submitForm = useSubmitForm();

    return {
        submitForm,
    };
}

export function useAnalyticsActions() {
    const trackView = useTrackFormView();

    return {
        trackView,
    };
}
