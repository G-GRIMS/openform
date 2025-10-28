import type {
    Form,
    FormField,
    FormSubmission,
    FieldType,
    FieldConfig,
} from '@/types/form';

/**
 * Generate a unique field key for form fields
 */
export function generateFieldKey(): string {
    return `field_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Validate form field configuration
 */
export function validateField(field: Partial<FormField>): string[] {
    const errors: string[] = [];

    if (!field.label?.trim()) {
        errors.push('Field label is required');
    }

    if (!field.type) {
        errors.push('Field type is required');
    }

    // Type-specific validations
    switch (field.type) {
        case 'select':
        case 'radio':
        case 'checkbox':
            if (!field.config?.options || field.config.options.length === 0) {
                errors.push('Options are required for this field type');
            }
            break;
        case 'email':
            if (field.required && !field.placeholder?.includes('@')) {
                // Just a suggestion, not an error
            }
            break;
    }

    return errors;
}

/**
 * Validate form submission data against form fields
 */
export function validateSubmission(
    formData: Record<string, any>,
    fields: FormField[],
): Record<string, string> {
    const errors: Record<string, string> = {};

    fields.forEach((field) => {
        const value = formData[field.fieldKey];

        // Required field validation
        if (field.required) {
            if (!value || (Array.isArray(value) && value.length === 0)) {
                errors[field.fieldKey] = `${field.label} is required`;
                return;
            }
        }

        // Skip further validation if field is empty and not required
        if (!value && !field.required) {
            return;
        }

        // Type-specific validation
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    errors[field.fieldKey] =
                        'Please enter a valid email address';
                }
                break;
            case 'number':
                if (value && isNaN(Number(value))) {
                    errors[field.fieldKey] = 'Please enter a valid number';
                }
                break;
            case 'url':
                try {
                    if (value) new URL(value);
                } catch {
                    errors[field.fieldKey] = 'Please enter a valid URL';
                }
                break;
            case 'date':
                if (value && isNaN(Date.parse(value))) {
                    errors[field.fieldKey] = 'Please enter a valid date';
                }
                break;
        }
    });

    return errors;
}

/**
 * Transform form submission data for storage
 */
export function transformSubmissionData(
    formData: Record<string, any>,
    fields: FormField[],
): Record<string, any> {
    const transformed: Record<string, any> = {};

    fields.forEach((field) => {
        const value = formData[field.fieldKey];

        // Handle different field types
        switch (field.type) {
            case 'checkbox':
                // Ensure checkbox values are arrays
                transformed[field.fieldKey] = Array.isArray(value)
                    ? value
                    : value
                      ? [value]
                      : [];
                break;
            case 'number':
                // Convert to number if possible
                transformed[field.fieldKey] = value ? Number(value) : null;
                break;
            case 'date':
                // Ensure date is in ISO format
                transformed[field.fieldKey] = value
                    ? new Date(value).toISOString()
                    : null;
                break;
            default:
                transformed[field.fieldKey] = value || null;
        }
    });

    return transformed;
}

/**
 * Calculate form completion percentage
 */
export function calculateCompletionPercentage(
    formData: Record<string, any>,
    fields: FormField[],
): number {
    if (fields.length === 0) return 100;

    const filledFields = fields.filter((field) => {
        const value = formData[field.fieldKey];
        return field.required
            ? value !== undefined && value !== null && value !== ''
            : true;
    });

    return Math.round((filledFields.length / fields.length) * 100);
}

/**
 * Get form field by field key
 */
export function getFieldByKey(
    fields: FormField[],
    fieldKey: string,
): FormField | undefined {
    return fields.find((field) => field.fieldKey === fieldKey);
}

/**
 * Sort form fields by order
 */
export function sortFieldsByOrder(fields: FormField[]): FormField[] {
    return [...fields].sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Check if form has any logic rules
 */
export function hasFormLogic(fields: FormField[]): boolean {
    return fields.some((field) => field.logic && field.logic.length > 0);
}

/**
 * Get default field configuration for a given type
 */
export function getDefaultFieldConfig(type: FieldType): Partial<FormField> {
    const baseConfig: Partial<FormField> = {
        type,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        placeholder: '',
        required: false,
        order: 0,
        config: {},
    };

    switch (type) {
        case 'text':
            return {
                ...baseConfig,
                placeholder: 'Enter your answer',
            };
        case 'email':
            return {
                ...baseConfig,
                placeholder: 'Enter your email',
            };
        case 'number':
            return {
                ...baseConfig,
                placeholder: 'Enter a number',
            };
        case 'textarea':
            return {
                ...baseConfig,
                placeholder: 'Enter your response',
            };
        case 'select':
        case 'radio':
            return {
                ...baseConfig,
                config: {
                    options: ['Option 1', 'Option 2', 'Option 3'],
                },
            };
        case 'checkbox':
            return {
                ...baseConfig,
                config: {
                    options: ['Option 1', 'Option 2', 'Option 3'],
                },
            };
        case 'date':
            return {
                ...baseConfig,
                placeholder: 'Select a date',
            };
        case 'url':
            return {
                ...baseConfig,
                placeholder: 'https://example.com',
            };
        case 'file':
        case 'image':
            return {
                ...baseConfig,
                placeholder: 'Choose a file',
                config: {
                    maxSize: 5,
                    acceptedFormats:
                        type === 'image'
                            ? ['image/jpeg', 'image/png', 'image/gif']
                            : ['*/*'],
                },
            };
        case 'phone':
            return {
                ...baseConfig,
                placeholder: '(555) 123-4567',
            };
        default:
            return baseConfig;
    }
}
