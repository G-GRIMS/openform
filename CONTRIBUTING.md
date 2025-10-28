# Contributing to OpenForm

Thank you for your interest in contributing to OpenForm! We welcome contributions from everyone. By participating in this project, you agree to abide by our [Code of Conduct](#code-of-conduct).

## 📋 Table of Contents

- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Code of Conduct](#code-of-conduct)

## 🤝 How to Contribute

### Types of Contributions

- **🐛 Bug Fixes**: Fix bugs and issues
- **✨ Features**: Add new features or enhancements
- **📚 Documentation**: Improve documentation and guides
- **🎨 UI/UX**: Improve user interface and experience
- **🔧 Maintenance**: Code refactoring, performance improvements
- **🧪 Testing**: Add or improve tests

### Getting Started

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Test your changes thoroughly
5. Submit a pull request

## 🛠️ Development Setup

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Git

### Local Development

1. **Clone your fork**

    ```bash
    git clone https://github.com/G-GRIMS/openform.git
    cd openform
    ```

2. **Install dependencies**

    ```bash
    pnpm install
    ```

3. **Start development server**

    ```bash
    pnpm dev
    ```

4. **Run linting**

    ```bash
    pnpm lint
    ```

5. **Build for production**
    ```bash
    pnpm build
    ```

### Project Structure

```
openform/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── f/                 # Public form pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── form-builder/     # Form builder components
│   └── form-submission/  # Form submission components
├── lib/                   # Utility functions and data
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## 📝 Code Style Guidelines

### TypeScript/React

- Use TypeScript for all new code
- Follow the existing patterns in the codebase
- Use functional components with hooks
- Use proper TypeScript types (avoid `any`)
- Follow the [AGENTS.md](AGENTS.md) guidelines

### Naming Conventions

- **Components**: PascalCase (e.g., `FormBuilder`, `Button`)
- **Functions/Variables**: camelCase (e.g., `addField`, `selectedFieldId`)
- **Files**: kebab-case for components, camelCase for utilities
- **Types**: PascalCase with descriptive names

### Imports

```typescript
// React imports first
import * as React from 'react';
import { useState } from 'react';

// External libraries
import { Button } from '@/components/ui/button';

// Internal imports
import { cn } from '@/lib/utils';
```

### Styling

- Use Tailwind CSS classes
- Utilize the `cn()` utility for conditional classes
- Follow the design system established by shadcn/ui

## 🌿 Branch Naming Conventions

Use descriptive branch names following this pattern:

```
type/description-kebab-case

Types:
- feature/     # New features
- bugfix/      # Bug fixes
- hotfix/      # Critical fixes
- refactor/    # Code refactoring
- docs/        # Documentation
- test/        # Testing

Examples:
- feature/add-form-logic
- bugfix/fix-validation-error
- refactor/cleanup-components
```

## 📝 Commit Message Guidelines

Follow conventional commit format:

```
type(scope): description

Types:
- feat:     New features
- fix:      Bug fixes
- docs:     Documentation
- style:    Code style changes
- refactor: Code refactoring
- test:     Testing
- chore:    Maintenance

Examples:
- feat(form-builder): add drag-and-drop functionality
- fix(validation): resolve email validation issue
- docs(readme): update installation instructions
```

## 🔄 Pull Request Process

1. **Create a PR** from your feature branch to `main`
2. **Fill out the PR template** with:
    - Clear title and description
    - Screenshots for UI changes
    - Testing instructions
    - Related issues

3. **Ensure**:
    - Code passes all linting checks
    - Tests pass (when available)
    - No TypeScript errors
    - Code follows style guidelines

4. **Request review** from maintainers
5. **Address feedback** and make necessary changes
6. **Merge** once approved

### PR Title Format

```
type: Brief description of changes

Examples:
feat: Add form logic functionality
fix: Resolve mobile responsiveness issues
docs: Update API documentation
```

## 🐛 Issue Reporting Guidelines

### Bug Reports

**Good bug reports** include:

- Clear title describing the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser/OS information
- Screenshots if applicable
- Code snippets if relevant

**Template:**

```markdown
## Bug Description

Brief description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- Browser: [e.g., Chrome 91]
- OS: [e.g., macOS 12.1]
- Version: [e.g., v1.0.0]
```

### Feature Requests

**Good feature requests** include:

- Clear description of the proposed feature
- Use case and benefits
- Mockups or examples if applicable
- Implementation suggestions (optional)

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Standards

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers.

---

Thank you for contributing to OpenForm! 🚀
