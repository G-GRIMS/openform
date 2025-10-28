// Database document types (match Convex schema)
export type Doc<T extends string> = { _id: Id<T> } & Record<string, any>;
export type Id<T extends string> = string & { __tableName: T };

// Form types
export interface Form {
    _id: Id<'forms'>;
    userId: Id<'users'>;
    title: string;
    description: string;
    status: 'draft' | 'published' | 'archived';
    settings: FormSettings;
    createdAt: number;
    updatedAt: number;
}

export interface FormSettings {
    allowAnonymous: boolean;
    requireAuth: boolean;
    redirectUrl?: string;
    emailNotifications: boolean;
    webhookUrl?: string;
    maxSubmissions?: number;
    submissionLimit?: number;
}

// Field types
export interface FormField {
    _id: Id<'formFields'>;
    formId: Id<'forms'>;
    fieldKey: string; // Unique identifier within form
    type: FieldType;
    label: string;
    placeholder?: string;
    description?: string;
    required: boolean;
    order: number;
    config: FieldConfig;
    logic?: LogicRule[];
}

export type FieldType =
    | 'text'
    | 'email'
    | 'number'
    | 'date'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'image'
    | 'file'
    | 'url'
    | 'phone';

export interface FieldConfig {
    options?: string[];
    maxLength?: number;
    minLength?: number;
    maxSize?: number; // File size in MB
    acceptedFormats?: string[]; // MIME types
    defaultValue?: any;
    validation?: ValidationRules;
}

export interface ValidationRules {
    pattern?: string;
    min?: number;
    max?: number;
    customError?: string;
}

export interface LogicRule {
    id: string;
    triggerFieldId: string;
    condition: LogicCondition;
    value: any;
    action: LogicAction;
}

export type LogicCondition =
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'not_contains'
    | 'greater_than'
    | 'less_than'
    | 'is_empty'
    | 'is_not_empty'
    | 'matches_regex';

export type LogicAction = 'show' | 'hide' | 'require' | 'disable';

// Submission types
export interface FormSubmission {
    _id: Id<'submissions'>;
    formId: Id<'forms'>;
    userId?: Id<'users'>;
    data: Record<string, any>;
    metadata: SubmissionMetadata;
    status: 'pending' | 'completed' | 'spam';
    submittedAt: number;
}

export interface SubmissionMetadata {
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
    completionTime?: number;
    startedAt: number;
}

// Analytics types
export interface FormAnalytics {
    _id: Id<'formAnalytics'>;
    formId: Id<'forms'>;
    date: string;
    views: number;
    submissions: number;
    uniqueViews: number;
    bounceRate: number;
    completionRate: number;
    averageTime: number;
    deviceBreakdown: DeviceBreakdown;
    referrerBreakdown: Record<string, number>;
}

export interface DeviceBreakdown {
    desktop: number;
    mobile: number;
    tablet: number;
}

// API Response types
export interface FormWithFields extends Form {
    fields: FormField[];
    analytics?: FormAnalyticsSummary;
}

export interface FormAnalyticsSummary {
    totalViews: number;
    totalSubmissions: number;
    completionRate: number;
    averageTime: number;
    lastSubmission?: number;
}

// Query/Mutation argument types
export interface CreateFormArgs {
    title: string;
    description: string;
    settings?: Partial<FormSettings>;
}

export interface UpdateFormArgs {
    formId: Id<'forms'>;
    title?: string;
    description?: string;
    settings?: Partial<FormSettings>;
}

export interface CreateFieldArgs {
    formId: Id<'forms'>;
    fieldKey: string;
    type: FieldType;
    label: string;
    required?: boolean;
    config?: Partial<FieldConfig>;
    logic?: LogicRule[];
}

export interface SubmitFormArgs {
    formId: Id<'forms'>;
    data: Record<string, any>;
    metadata?: Partial<SubmissionMetadata>;
}

// Pagination types
export interface PaginationOptions {
    cursor?: string;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    hasMore: boolean;
    nextCursor?: string;
    totalCount?: number;
}

// Legacy types for backward compatibility (will be removed)
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
}
