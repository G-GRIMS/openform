export type FieldType =
    | 'text'
    | 'email'
    | 'number'
    | 'date'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'image';

export type LogicCondition =
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'not_contains'
    | 'greater_than'
    | 'less_than'
    | 'is_empty'
    | 'is_not_empty';

export interface LogicRule {
    id: string;
    triggerFieldId: string;
    condition: LogicCondition;
    value: string | string[];
    action: 'show' | 'hide';
}

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    description?: string;
    required: boolean;
    options?: string[];
    maxSize?: number;
    acceptedFormats?: string[];
    logic?: LogicRule[]; // Added logic rules to control field visibility
}

export interface Form {
    id: string;
    title: string;
    description: string;
    fields: FormField[];
    createdAt: string;
    updatedAt: string;
    status: 'draft' | 'published' | 'archived';
    submissionCount: number;
    viewCount: number;
}

export interface FormSubmission {
    id: string;
    formId: string;
    data: Record<string, any>;
    submittedAt: string;
}

export interface FormAnalytics {
    formId: string;
    views: number;
    submissions: number;
    completionRate: number;
    averageTime: number;
    viewsByDate: { date: string; count: number }[];
    submissionsByDate: { date: string; count: number }[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
}
