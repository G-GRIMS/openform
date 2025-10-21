"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface EditableHeaderProps {
  title: string
  description: string
  onTitleChange: (title: string) => void
  onDescriptionChange: (description: string) => void
}

export function EditableHeader({ title, description, onTitleChange, onDescriptionChange }: EditableHeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  useEffect(() => {
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus()
      descriptionInputRef.current.select()
    }
  }, [isEditingDescription])

  const handleTitleBlur = () => {
    onTitleChange(editTitle || "Untitled Form")
    setIsEditingTitle(false)
  }

  const handleDescriptionBlur = () => {
    onDescriptionChange(editDescription)
    setIsEditingDescription(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleBlur()
    } else if (e.key === "Escape") {
      setEditTitle(title)
      setIsEditingTitle(false)
    }
  }

  const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setEditDescription(description)
      setIsEditingDescription(false)
    }
  }

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
          className="text-3xl font-bold text-foreground mb-2 w-full bg-transparent border-b-2 border-primary outline-none px-0"
        />
      ) : (
        <h1
          onClick={() => {
            setEditTitle(title)
            setIsEditingTitle(true)
          }}
          className="text-3xl font-bold text-foreground mb-2 cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5 transition-colors"
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
          className="text-muted-foreground w-full bg-transparent border-b-2 border-primary outline-none px-0 resize-none"
          rows={2}
        />
      ) : (
        <p
          onClick={() => {
            setEditDescription(description)
            setIsEditingDescription(true)
          }}
          className="text-muted-foreground cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5 transition-colors"
        >
          {description || "Add a description..."}
        </p>
      )}
    </div>
  )
}
