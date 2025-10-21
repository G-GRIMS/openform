import type { FormField, LogicRule } from "@/types/form"

export function evaluateFieldVisibility(
  field: FormField,
  allFields: FormField[],
  formData: Record<string, any>,
): boolean {
  // If no logic rules, field is always visible
  if (!field.logic || field.logic.length === 0) {
    return true
  }

  // Evaluate all logic rules (AND logic - all must be true)
  return field.logic.every((rule) => evaluateRule(rule, formData))
}

function evaluateRule(rule: LogicRule, formData: Record<string, any>): boolean {
  const fieldValue = formData[rule.triggerFieldId]
  const ruleValue = rule.value

  let conditionMet = false

  switch (rule.condition) {
    case "equals":
      if (Array.isArray(fieldValue)) {
        conditionMet = Array.isArray(ruleValue)
          ? fieldValue.some((v) => ruleValue.includes(v))
          : fieldValue.includes(ruleValue)
      } else {
        conditionMet = fieldValue === ruleValue
      }
      break

    case "not_equals":
      if (Array.isArray(fieldValue)) {
        conditionMet = Array.isArray(ruleValue)
          ? !fieldValue.some((v) => ruleValue.includes(v))
          : !fieldValue.includes(ruleValue)
      } else {
        conditionMet = fieldValue !== ruleValue
      }
      break

    case "contains":
      if (typeof fieldValue === "string" && typeof ruleValue === "string") {
        conditionMet = fieldValue.toLowerCase().includes(ruleValue.toLowerCase())
      }
      break

    case "not_contains":
      if (typeof fieldValue === "string" && typeof ruleValue === "string") {
        conditionMet = !fieldValue.toLowerCase().includes(ruleValue.toLowerCase())
      }
      break

    case "greater_than":
      conditionMet = Number(fieldValue) > Number(ruleValue)
      break

    case "less_than":
      conditionMet = Number(fieldValue) < Number(ruleValue)
      break

    case "is_empty":
      conditionMet = !fieldValue || fieldValue === "" || (Array.isArray(fieldValue) && fieldValue.length === 0)
      break

    case "is_not_empty":
      conditionMet = !!fieldValue && fieldValue !== "" && (!Array.isArray(fieldValue) || fieldValue.length > 0)
      break

    default:
      conditionMet = false
  }

  // Apply action (show or hide)
  return rule.action === "show" ? conditionMet : !conditionMet
}

export function getAvailableTriggerFields(currentFieldId: string, allFields: FormField[]): FormField[] {
  const currentIndex = allFields.findIndex((f) => f.id === currentFieldId)
  return allFields.slice(0, currentIndex)
}
