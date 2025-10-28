'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';

interface EditableHeaderProps {
    title: string;
    description: string;
    onTitleChange: (title: string) => void;
    onDescriptionChange: (description: string) => void;
}

export function EditableHeader({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
}: EditableHeaderProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditingTitle]);

    useEffect(() => {
        if (isEditingDescription && descriptionInputRef.current) {
            descriptionInputRef.current.focus();
            descriptionInputRef.current.select();
        }
    }, [isEditingDescription]);

    const handleTitleBlur = () => {
        onTitleChange(editTitle || 'Untitled Form');
        setIsEditingTitle(false);
    };

    const handleDescriptionBlur = () => {
        onDescriptionChange(editDescription);
        setIsEditingDescription(false);
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleTitleBlur();
        } else if (e.key === 'Escape') {
            setEditTitle(title);
            setIsEditingTitle(false);
        }
    };

    const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setEditDescription(description);
            setIsEditingDescription(false);
        }
    };

    return (
        <div className="mb-8">
            {isEditingTitle ? (
                <input
                    ref={titleInputRef}
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="text-foreground border-primary mb-2 w-full border-b-2 bg-transparent px-0 text-3xl font-bold outline-none"
                />
            ) : (
                <h1
                    onClick={() => {
                        setEditTitle(title);
                        setIsEditingTitle(true);
                    }}
                    className="text-foreground hover:bg-muted/50 mb-2 cursor-pointer rounded px-1 py-0.5 text-3xl font-bold transition-colors"
                >
                    {title}
                </h1>
            )}

            {isEditingDescription ? (
                <textarea
                    ref={descriptionInputRef}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    onBlur={handleDescriptionBlur}
                    onKeyDown={handleDescriptionKeyDown}
                    className="text-muted-foreground border-primary w-full resize-none border-b-2 bg-transparent px-0 outline-none"
                    rows={2}
                />
            ) : (
                <p
                    onClick={() => {
                        setEditDescription(description);
                        setIsEditingDescription(true);
                    }}
                    className="text-muted-foreground hover:bg-muted/50 cursor-pointer rounded px-1 py-0.5 transition-colors"
                >
                    {description || 'Add a description...'}
                </p>
            )}
        </div>
    );
}
