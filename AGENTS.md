# Agent Guidelines for OpenForm

## Build Commands

- `pnpm build` - Build production bundle
- `pnpm dev` - Start development server
- `pnpm lint` - Run ESLint (no custom config, uses defaults)
- `pnpm start` - Start production server

## Code Style Guidelines

### Framework & Libraries

- Next.js 15 with React 19, TypeScript (strict mode enabled)
- shadcn/ui components (new-york style) with Tailwind CSS + CSS variables
- Radix UI primitives, Lucide icons, class-variance-authority
- Path aliases: `@/components`, `@/lib`, `@/lib/utils`, `@/components/ui`, `@/hooks`

### Imports & Structure

- Client components: `"use client"` directive at top
- React imports: `import * as React from 'react'`
- Use `@/` aliases for internal imports, relative paths for same-directory
- Group imports: React/React hooks, external libs, internal components/utils

### Naming Conventions

- Components: PascalCase (e.g., `FormBuilder`, `Button`)
- Functions/variables: camelCase (e.g., `addField`, `selectedFieldId`)
- Files: kebab-case for components (e.g., `form-builder.tsx`), camelCase for utils
- Props: camelCase, boolean props with `is`/`has` prefixes when appropriate

### TypeScript

- Strict mode enabled, leverage type inference
- Define interfaces for data structures in `types/` directory
- Use union types for enums, optional properties with `?`
- Generic `Record<string, any>` for flexible objects
- Properly type state arrays: `useState<FormField[]>([])` instead of `useState([])`

### Styling

- Tailwind CSS classes with responsive prefixes
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Component variants via `class-variance-authority`
- Dark mode support with CSS variables

### Error Handling

- No specific patterns observed - handle errors appropriately per component context
- Use TypeScript strict mode to catch type errors at compile time

### Testing

- No test framework configured - add tests as needed with preferred framework
