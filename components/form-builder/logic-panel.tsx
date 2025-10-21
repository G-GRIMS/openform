"use client"

import { useState } from "react"
import type { FormField, LogicRule, LogicCondition } from "@/types/form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { X, Plus, Zap } from "lucide-react"
import { getAvailableTriggerFields } from "@/lib/utils/logic-evaluator"
import { Checkbox } from "@/components/ui/checkbox"

interface LogicPanelProps {
  field: FormField
  allFields: FormField[]
  onUpdate: (logic: LogicRule[]) => void
  onClose: () => void
}

export function LogicPanel({ field, allFields, onUpdate, onClose }: LogicPanelProps) {
  const [rules, setRules] = useState<LogicRule[]>(field.logic || [])
  const availableTriggerFields = getAvailableTriggerFields(field.id, allFields)

  const addRule = () => {
    const newRule: LogicRule = {
      id: `rule-${Date.now()}`,
      triggerFieldId: "",
      condition: "equals",
      value: "",
      action: "show",
    }
    setRules([...rules, newRule])
  }

  const updateRule = (ruleId: string, updates: Partial<LogicRule>) => {
    setRules(rules.map((r) => (r.id === ruleId ? { ...r, ...updates } : r)))
  }

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter((r) => r.id !== ruleId))
  }

  const handleSave = () => {
    // Filter out incomplete rules
    const validRules = rules.filter((r) => r.triggerFieldId && r.value)
    onUpdate(validRules)
    onClose()
  }

  const getConditionsForFieldType = (fieldType: string): LogicCondition[] => {
    const baseConditions: LogicCondition[] = ["equals", "not_equals", "is_empty", "is_not_empty"]

    if (fieldType === "text" || fieldType === "textarea" || fieldType === "email") {
      return [...baseConditions, "contains", "not_contains"]
    }

    if (fieldType === "number" || fieldType === "date") {
      return [...baseConditions, "greater_than", "less_than"]
    }

    return baseConditions
  }

  const renderValueInput = (rule: LogicRule) => {
    const triggerField = allFields.find((f) => f.id === rule.triggerFieldId)
    if (!triggerField) return null

    // For select, radio, checkbox - show options
    if (triggerField.type === "select" || triggerField.type === "radio") {
      return (
        <Select value={rule.value as string} onValueChange={(value) => updateRule(rule.id, { value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {triggerField.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    if (triggerField.type === "checkbox") {
      return (
        <div className="space-y-2 border rounded-md p-3">
          {triggerField.options?.map((option) => {
            const selectedValues = Array.isArray(rule.value) ? rule.value : []
            return (
              <div key={option} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => {
                    const newValues = checked ? [...selectedValues, option] : selectedValues.filter((v) => v !== option)
                    updateRule(rule.id, { value: newValues })
                  }}
                />
                <Label className="text-sm">{option}</Label>
              </div>
            )
          })}
        </div>
      )
    }

    // For other types, show text input
    return (
      <Input
        type={triggerField.type === "number" ? "number" : triggerField.type === "date" ? "date" : "text"}
        value={rule.value as string}
        onChange={(e) => updateRule(rule.id, { value: e.target.value })}
        placeholder="Enter value"
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Conditional Logic</h2>
              <p className="text-sm text-muted-foreground">Show or hide this field based on other answers</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {availableTriggerFields.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No fields available to create logic rules.</p>
              <p className="text-xs mt-1">Add fields before this one to use as triggers.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                <strong>Field:</strong> {field.label}
              </div>

              {rules.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">No logic rules yet</p>
                  <Button onClick={addRule} size="sm" variant="outline" className="gap-2 bg-transparent">
                    <Plus className="w-4 h-4" />
                    Add Rule
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {rules.map((rule, index) => {
                    const triggerField = allFields.find((f) => f.id === rule.triggerFieldId)
                    const availableConditions = triggerField ? getConditionsForFieldType(triggerField.type) : []

                    return (
                      <div key={rule.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rule {index + 1}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteRule(rule.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid gap-4">
                          {/* Action */}
                          <div className="space-y-2">
                            <Label className="text-sm">Action</Label>
                            <Select
                              value={rule.action}
                              onValueChange={(value: "show" | "hide") => updateRule(rule.id, { action: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="show">Show this field when...</SelectItem>
                                <SelectItem value="hide">Hide this field when...</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Trigger Field */}
                          <div className="space-y-2">
                            <Label className="text-sm">Trigger Field</Label>
                            <Select
                              value={rule.triggerFieldId}
                              onValueChange={(value) => updateRule(rule.id, { triggerFieldId: value, value: "" })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableTriggerFields.map((f) => (
                                  <SelectItem key={f.id} value={f.id}>
                                    {f.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Condition */}
                          {rule.triggerFieldId && (
                            <div className="space-y-2">
                              <Label className="text-sm">Condition</Label>
                              <Select
                                value={rule.condition}
                                onValueChange={(value: LogicCondition) => updateRule(rule.id, { condition: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableConditions.map((condition) => (
                                    <SelectItem key={condition} value={condition}>
                                      {condition.replace(/_/g, " ")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {/* Value */}
                          {rule.triggerFieldId && !["is_empty", "is_not_empty"].includes(rule.condition) && (
                            <div className="space-y-2">
                              <Label className="text-sm">Value</Label>
                              {renderValueInput(rule)}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}

                  <Button onClick={addRule} variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                    <Plus className="w-4 h-4" />
                    Add Another Rule
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">All rules must be true for the action to apply</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Logic</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
