# CLAUDE.md — MusicMeta UI

Next.js/TypeScript frontend for MusicMeta — a musician's metadata tracking platform.
Musicians create, track, and share metadata for their musical works.

## Tech Stack

- **Next.js 14+** (Pages Router) · **React 18+** · **TypeScript 5+**
- **Apollo Client v3** — GraphQL → musicmeta-api (Absinthe backend)
- **NextAuth.js** — Google OAuth · **Jest** — unit tests · **ESLint + Prettier**
- **graphql-codegen** — TypeScript types generated from GraphQL schema

## Rules — Read and Follow Every One

### 1. String Constants — No Hardcoded Strings

NEVER write human-readable strings inline. Every string a user sees lives in `src/constants/`.

```tsx
// ✅ Correct
<button>{LABELS.NEW_WORK_BUTTON}</button>
<input placeholder={PLACEHOLDERS.WORK_TITLE} aria-label={ARIA.SEARCH_PEOPLE} />
<p>{EMPTY_STATES.NO_WORKS}</p>

// ❌ Wrong — will be rejected in review
<button>New Work</button>
<input placeholder="Enter work title" aria-label="Search people" />
<p>No works yet.</p>
```

This covers: button text, headings, labels, placeholders, aria-labels, alt text,
error messages, empty states, loading states, confirm dialogs, tooltips — everything.

Tests use the same constants — never raw strings in assertions:
```ts
// ✅ screen.getByText(EMPTY_STATES.NO_WORKS)
// ❌ screen.getByText('No works yet.')
```

Full pattern with grouping, naming rules, and dynamic strings:
→ [documentation/concepts/string-constants.md](./documentation/concepts/string-constants.md)

### 2. Component Structure

```
src/components/MyComponent/
  MyComponent.tsx       ← named export only, no default export
  MyComponentProps.ts   ← props interface
  index.ts              ← re-exports MyComponent
```

### 3. No Default Exports

```ts
// ✅ export const MyComponent = ...
// ❌ export default MyComponent   (except Next.js pages — those must default export)
```

### 4. TypeScript Strict

`tsc --noEmit` must pass. No `any` without a comment explaining why.

### 5. Soft Deletes Only

Never hard-delete records. Always use the API's soft-delete mutations.

## Repo Structure

```text
src/
  components/     → Reusable React components (see Rule 2 above)
  constants/      → ALL human-readable strings (see Rule 1 above)
  pages/          → Next.js pages
  utils/          → Utility functions
graphql/          → GraphQL queries and mutations
documentation/
  concepts/       → Patterns and conventions (depth + rationale)
  LINTING.md
  VERSIONING.md
```

## Key Domain Concepts

- **Work** — primary entity. Musical composition/recording with a detail page.
- **WorkVersion** — snapshot fork of a Work. Versions form a tree (breadcrumb + graph nav).
- **People Directory** — shared address book of musicians, engineers, producers.
- **Credits** — links Person + Role to a Work with instrument detail.
- **Inline editing** — click any field on the Work detail page to edit in place.
- **Read-only share link** — sharable view with field-level visibility control.

## Checklist: Adding or Modifying a Component

1. All strings → `src/constants/` before touching JSX
2. Tests use imported constants, not raw strings
3. Props interface in `ComponentNameProps.ts`
4. Named export only
5. `yarn lint` passes
6. `tsc --noEmit` passes
7. `yarn test` passes

## Testing

- `yarn test` / `yarn test:coverage`
- POC target (RL2): 20% · MVP target (RL3): 50%

## Git Flow

Feature branches → PR to `develop` → `staging` → `main`.
PRs to `staging`/`main` require Code Quality gate (already satisfied by `develop` gate).

## Deeper Concepts

| Topic | Document |
|-------|----------|
| String constants — full pattern, grouping, naming, tests | [concepts/string-constants.md](./documentation/concepts/string-constants.md) |

## Never

- Hardcode human-readable strings in JSX or anywhere a user sees them
- Hard-delete records
- Default export components (except Next.js pages)
- Expose credentials in code or committed env files
- Commit with failing lint, type errors, or broken tests
