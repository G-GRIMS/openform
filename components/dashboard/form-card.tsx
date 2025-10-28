import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Eye, FileText, MoreVertical } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useFormActions } from '@/lib/hooks/use-forms';
import type { Form } from '@/types/form';

interface FormCardProps {
    form: Form;
}

export function FormCard({ form }: FormCardProps) {
    const { deleteForm, publishForm, archiveForm, duplicateForm } =
        useFormActions();

    const [isDeleting, setIsDeleting] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isArchiving, setIsArchiving] = useState(false);
    const [isDuplicating, setIsDuplicating] = useState(false);

    const statusColors = {
        published: 'bg-green-500/10 text-green-700 dark:text-green-400',
        draft: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
        archived: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
    };

    const handleDelete = async () => {
        if (
            confirm(
                'Are you sure you want to delete this form? This action cannot be undone.',
            )
        ) {
            try {
                setIsDeleting(true);
                await deleteForm({ formId: form._id });
            } catch (error) {
                console.error('Failed to delete form:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handlePublish = async () => {
        try {
            setIsPublishing(true);
            await publishForm({ formId: form._id });
        } catch (error) {
            console.error('Failed to publish form:', error);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleArchive = async () => {
        try {
            setIsArchiving(true);
            await archiveForm({ formId: form._id });
        } catch (error) {
            console.error('Failed to archive form:', error);
        } finally {
            setIsArchiving(false);
        }
    };

    const handleDuplicate = async () => {
        try {
            setIsDuplicating(true);
            await duplicateForm({ formId: form._id });
        } catch (error) {
            console.error('Failed to duplicate form:', error);
        } finally {
            setIsDuplicating(false);
        }
    };

    return (
        <Card className="group relative overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">
                                <Link
                                    href={`/dashboard/${form._id}`}
                                    className="hover:underline"
                                >
                                    {form.title}
                                </Link>
                            </CardTitle>
                            <Badge
                                variant="secondary"
                                className={statusColors[form.status]}
                            >
                                {form.status}
                            </Badge>
                        </div>
                        <CardDescription className="mt-1 line-clamp-2">
                            {form.description}
                        </CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/${form._id}`}>
                                    View Details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/${form._id}/edit`}>
                                    Edit Form
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/f/${form._id}`} target="_blank">
                                    Preview
                                </Link>
                            </DropdownMenuItem>
                            {form.status === 'draft' && (
                                <DropdownMenuItem
                                    onClick={handlePublish}
                                    disabled={isPublishing}
                                >
                                    {isPublishing
                                        ? 'Publishing...'
                                        : 'Publish Form'}
                                </DropdownMenuItem>
                            )}
                            {form.status === 'published' && (
                                <DropdownMenuItem
                                    onClick={handleArchive}
                                    disabled={isArchiving}
                                >
                                    {isArchiving
                                        ? 'Archiving...'
                                        : 'Archive Form'}
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                                onClick={handleDuplicate}
                                disabled={isDuplicating}
                            >
                                {isDuplicating ? 'Duplicating...' : 'Duplicate'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>0 submissions</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>0 views</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                            {new Date(form.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
