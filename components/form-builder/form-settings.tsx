"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { X, Bold, Italic, Link } from "lucide-react"

export function FormSettings({ field, onUpdate }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkData, setLinkData] = useState({ url: '', text: '' })

  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = field.description?.substring(start, end) || ''
    const newText = prefix + selectedText + suffix
    const newValue = field.description?.substring(0, start) + newText + field.description?.substring(end) || ''

    onUpdate({ description: newValue })

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + newText.length
      textarea.focus()
    }, 0)
  }

  const insertLink = () => {
    setIsLinkDialogOpen(true)
  }

  const handleLinkSubmit = () => {
    if (!linkData.url.trim() || !linkData.text.trim()) return
    insertMarkdown(`[${linkData.text}](${linkData.url})`)
    setLinkData({ url: '', text: '' })
    setIsLinkDialogOpen(false)
  }
  const handleAddOption = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`]
    onUpdate({ options: newOptions })
  }

  const handleRemoveOption = (index) => {
    const newOptions = field.options.filter((_, i) => i !== index)
    onUpdate({ options: newOptions })
  }

  const handleUpdateOption = (index, value) => {
    const newOptions = [...field.options]
    newOptions[index] = value
    onUpdate({ options: newOptions })
  }

  const handleToggleFormat = (format) => {
    const currentFormats = field.acceptedFormats || []
    const newFormats = currentFormats.includes(format)
      ? currentFormats.filter((f) => f !== format)
      : [...currentFormats, format]
    onUpdate({ acceptedFormats: newFormats })
  }

  return (
    <div className="p-4 space-y-4">
      {/* Label */}
      <div>
        <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Field Label</Label>
        <Input
          value={field.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          placeholder="Field label"
          className="text-sm"
        />
      </div>

      {/* Placeholder */}
      {field.type !== "image" && (
        <div>
          <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Placeholder</Label>
          <Input
            value={field.placeholder}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            placeholder="Placeholder text"
            className="text-sm"
          />
        </div>
      )}

      {/* Description */}
      <div>
        <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Description</Label>
        <div className="space-y-2">
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => insertMarkdown('**', '**')}>
              <Bold className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => insertMarkdown('*', '*')}>
              <Italic className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => insertLink()}>
              <Link className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            ref={textareaRef}
            value={field.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Add a description with **bold**, *italic*, or [links](url)"
            className="text-sm min-h-[80px]"
          />
        </div>
      </div>

      {/* Required */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={field.required}
          onCheckedChange={(checked) => onUpdate({ required: checked })}
          id="required"
        />
        <Label htmlFor="required" className="text-sm cursor-pointer">
          Required field
        </Label>
      </div>

      {field.type === "image" && (
        <>
          <div>
            <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Max File Size (MB)</Label>
            <Input
              type="number"
              value={field.maxSize || 5}
              onChange={(e) => onUpdate({ maxSize: Number.parseInt(e.target.value) || 5 })}
              placeholder="5"
              min="1"
              max="50"
              className="text-sm"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Accepted Formats</Label>
            <div className="space-y-2">
              {["image/jpeg", "image/png", "image/gif", "image/webp"].map((format) => (
                <div key={format} className="flex items-center gap-2">
                  <Checkbox
                    checked={field.acceptedFormats?.includes(format)}
                    onCheckedChange={() => handleToggleFormat(format)}
                    id={format}
                  />
                  <Label htmlFor={format} className="text-sm cursor-pointer">
                    {format.split("/")[1].toUpperCase()}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Options for select, radio, checkbox */}
      {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
        <div>
          <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Options</Label>
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e) => handleUpdateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="text-sm"
                />
                <Button size="sm" variant="ghost" onClick={() => handleRemoveOption(index)} className="h-9 w-9 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={handleAddOption} className="w-full text-xs bg-transparent">
              Add Option
            </Button>
          </div>
        </div>
      )}

      {/* Link Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="link-text" className="text-sm font-medium">
                Link Text
              </Label>
              <Input
                id="link-text"
                value={linkData.text}
                onChange={(e) => setLinkData(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Enter link text"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="link-url" className="text-sm font-medium">
                URL
              </Label>
              <Input
                id="link-url"
                value={linkData.url}
                onChange={(e) => setLinkData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLinkSubmit} disabled={!linkData.url.trim() || !linkData.text.trim()}>
              Insert Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
