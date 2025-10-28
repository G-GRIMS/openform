# Agent Guidelines for OpenForm

## Build Commands

- `pnpm build` - Build production bundle
- `pnpm dev` - Start development server (don't run this)
- `pnpm lint` - Run ESLint
- `pnpm start` - Start production server (don't run this)
- No test framework configured

## Code Style Guidelines

- **Framework**: Next.js 15, React 19, TypeScript (strict mode)
- **UI**: shadcn/ui (new-york), Tailwind CSS, Radix UI, Lucide icons
- **Path aliases**: `@/components`, `@/lib`, `@/lib/utils`, `@/components/ui`, `@/hooks`

### Imports & Structure

- Client components: `"use client"` directive at top
- React imports: `import * as React from 'react'`
- Use `@/` aliases for internal imports, relative paths for same-directory
- Group imports: React/hooks, external libs, internal components/utils

### Naming Conventions

- Components: PascalCase (e.g., `FormBuilder`)
- Functions/variables: camelCase (e.g., `addField`)
- Files: kebab-case for components (e.g., `form-builder.tsx`), camelCase for utils
- Props: camelCase, boolean props with `is`/`has` prefixes

### TypeScript

- Strict mode enabled, leverage type inference
- Define interfaces in `types/` directory
- Use union types for enums, optional properties with `?`
- Properly type state: `useState<FormField[]>([])`

### Styling

- Tailwind CSS with responsive prefixes
- Use `cn()` utility for conditional classes
- Component variants via `class-variance-authority`
- Dark mode support with CSS variables

### Additional Rules

- Follow Cursor rules in `.cursor/rules/convex_rules.mdc` for Convex functions
- Run `pnpm lint` after code changes to ensure compliance
- No specific error handling patterns - use TypeScript strict mode for type safety
