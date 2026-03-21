# Concept: String Constants

## What It Is

Every human-readable string in the application lives in a named constant in `src/constants/`.
No string that a user ever sees should be hardcoded inline in a component.

## Why It Matters

- **Single source of truth** — change wording in one place, it updates everywhere
- **Localization-ready** — all strings are already collected if translation is ever needed
- **Consistent UX** — the same action always uses the same label across the app
- **Testable** — tests import the same constant as the component; no string drift
- **Discoverable** — anyone looking for "what does this button say?" has one place to look

## What Counts as a String Constant

Everything a human reads:

- Displayed text and headings
- Button labels
- Placeholder text
- Option labels (`Select person…`, `None`)
- Aria-labels and alt text
- Error messages
- Empty state messages
- Loading state text
- Confirm dialog messages
- Tooltip text

## Structure

Constants live in `src/constants/`, grouped by domain:

```text
src/constants/
  labels.ts       ← button text, field labels, headings
  placeholders.ts ← input placeholder text
  aria.ts         ← aria-label values
  errors.ts       ← error messages
  empty.ts        ← empty state messages
  loading.ts      ← loading / in-progress text
  options.ts      ← select option labels
  index.ts        ← re-exports everything
```

Group into objects by domain within each file:

```ts
// src/constants/labels.ts
export const LABELS = {
  NEW_WORK_BUTTON:    'New Work',
  CREATE_WORK_BUTTON: 'Create Work',
  ADD_CREDIT_BUTTON:  'Add Credit',
  ADD_LINK_BUTTON:    'Add Link',
  DELETE_WORK_BUTTON: 'Delete Work',
  CANCEL_BUTTON:      'Cancel',
  SAVE_BUTTON:        'Save',
  CLICK_TO_EDIT:      'Click to edit',
}

// src/constants/placeholders.ts
export const PLACEHOLDERS = {
  WORK_TITLE:         'Enter work title',
  WORK_DESCRIPTION:   'Optional description',
  CREDIT_NOTES:       'Optional notes',
  CREDIT_INSTRUMENT:  'e.g. electric guitar',
  LINK_DESCRIPTION:   'Optional description',
  PEOPLE_SEARCH:      'Search by name or email…',
}

// src/constants/aria.ts
export const ARIA = {
  REMOVE_CREDIT: 'Remove credit',
  REMOVE_LINK:   'Remove link',
  SEARCH_PEOPLE: 'Search people',
}

// src/constants/errors.ts
export const ERRORS = {
  ADD_CREDIT_FAILED:        'Failed to add credit.',
  ADD_LINK_FAILED:          'Failed to add link.',
  CREATE_WORK_FAILED:       'Failed to create work.',
  DELETE_WORK_FAILED:       'Failed to delete work.',
  UPDATE_TITLE_FAILED:      'Failed to update title.',
  UPDATE_DESCRIPTION_FAILED:'Failed to update description.',
}

// src/constants/empty.ts
export const EMPTY_STATES = {
  NO_WORKS:       'No works yet. Create your first one.',
  NO_CREDITS:     'No credits yet.',
  NO_LINKS:       'No links yet.',
  NO_PEOPLE:      'No people in the directory yet.',
  NO_DESCRIPTION: 'No description. Click to add one.',
}

// src/constants/loading.ts
export const LOADING = {
  GENERIC:  'Loading…',
  ADDING:   'Adding…',
  DELETING: 'Deleting…',
  SAVING:   'Saving…',
}

// src/constants/options.ts
export const OPTIONS = {
  SELECT_PERSON: 'Select person…',
  SELECT_ROLE:   'Select role…',
  NO_PARENT:     'None',
}
```

## Naming Convention

The constant name describes the **function** of the text — not the text itself.

```ts
// ✅ Describes what the button does
REMOVE_CREDIT: 'Remove credit'

// ❌ Describes what the button looks like
X_BUTTON: '✕'

// ✅ Describes the context
WORK_TITLE_PLACEHOLDER: 'Enter work title'

// ❌ Too generic
PLACEHOLDER: 'Enter work title'
```

## Dynamic Strings

Use functions for strings that require interpolation:

```ts
// src/constants/labels.ts
export function WORK_PAGE_TITLE(title: string) {
  return `${title} — MusicMeta`
}

export function GREETING(name?: string) {
  return `Hey${name ? ` ${name}` : ''}!`
}

export function CONFIRM_DELETE(resourceName: string) {
  return `Are you sure you want to delete "${resourceName}"? This cannot be undone.`
}
```

## Usage in Components

```tsx
import { LABELS, PLACEHOLDERS, ARIA, EMPTY_STATES, ERRORS } from '@/constants'

function WorksList() {
  return (
    <div>
      <button>{LABELS.NEW_WORK_BUTTON}</button>
      {works.length === 0 && <p>{EMPTY_STATES.NO_WORKS}</p>}
    </div>
  )
}

function CreditForm() {
  return (
    <input
      placeholder={PLACEHOLDERS.CREDIT_NOTES}
      aria-label={ARIA.REMOVE_CREDIT}
    />
  )
}
```

## Usage in Tests

Tests import the same constants — no string drift between implementation and test:

```ts
import { LABELS, EMPTY_STATES } from '@/constants'

it('shows empty state when no works exist', () => {
  render(<WorksList works={[]} />)
  expect(screen.getByText(EMPTY_STATES.NO_WORKS)).toBeInTheDocument()
})

it('has a new work button', () => {
  render(<WorksList works={[]} />)
  expect(screen.getByRole('button', { name: LABELS.NEW_WORK_BUTTON })).toBeInTheDocument()
})
```

## Review Checklist

Before approving any PR touching UI components:

- [ ] No human-readable strings hardcoded inline in JSX
- [ ] No hardcoded placeholder, aria-label, alt, or title attributes
- [ ] No hardcoded error messages in catch blocks
- [ ] No hardcoded empty state text
- [ ] New constants follow the naming convention (function, not text)
- [ ] Tests use constants, not raw strings
