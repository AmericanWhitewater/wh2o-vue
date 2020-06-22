# Naming Conventions

## Components

### Filename

Filenames of single-file components should always be PascalCase. PascalCase works best with autocompletion in code editors.

[Official Docs](https://vuejs.org/v2/style-guide/#Single-file-component-filename-casing-strongly-recommended)

```
// Good
HelpDesk.vue

// Bad
help-desk.vue
```

### Name

All component names should be multiple words and be in kebab-case. Using multiple words prevents conflicts with existing and future HTML elements. 
 
[Official Docs](https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential)

```js
// component
export default {
  name: 'help-desk'
}
```

```
// Good
"my-account"

// Bad 
MyAccount
```

## Classnames & IDs

TBD. Research [Tailwind](https://tailwindcss.com/)

```html
<div class="aw--text-01" ></div>
```

## Git

### Branching

Branch names are broken down into two parts, type, and descriptor. This helps us properly version the application.

#### Types 

- `feat`: Feature branches, code which adds to the application.
- `chore`: Routine work like updating a project dependency or refactoring.
- `bug`: Bug fix. When something has broken.
- `hf`: Hotfix. When something has broken and we need it fixed ASAP.

#### Example

```
feat/rapid-edit
```

```
bug/flow-chart-resize
```

### Commits

TBD

