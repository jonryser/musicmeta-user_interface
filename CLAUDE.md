# CLAUDE.md — MusicMeta UI

Next.js/TypeScript frontend for MusicMeta — a musician's metadata tracking platform.
Musicians use it to create, track, and share metadata for their musical works.

## Tech Stack

- **Next.js 14+** (Pages Router)
- **React 18+** / **TypeScript 5+**
- **Apollo Client v3** — GraphQL, connecting to musicmeta-api (Absinthe)
- **NextAuth.js** — Google OAuth
- **Jest** — unit testing
- **ESLint + Prettier** — linting/formatting
- **graphql-codegen** — TypeScript types generated from GraphQL schema

## Concepts — Read These First

Project-agnostic patterns used throughout this codebase:

| Concept | Document |
|---------|----------|
| String constants — all human-readable text in one place | [concepts/string-constants.md](./concepts/string-constants.md) |

## Repo Structure

```text
src/
  components/       → Reusable React components
  constants/        → ALL human-readable strings live here — see concepts/string-constants.md
  pages/            → Next.js pages
  utils/            → Utility functions and helpers
graphql/            → GraphQL query/mutation files
public/             → Static assets
templates/          → Component scaffolding templates
documentation/
  concepts/         → Patterns and conventions (read before writing code)
  LINTING.md
  VERSIONING.md
```

## Key Domain Concepts

- **Work** — the primary entity. A musical composition/recording with a detail page.
- **WorkVersion** — snapshot fork of a Work. Versions form a tree with breadcrumb + graph navigation.
- **People Directory** — shared address book of musicians, engineers, producers.
- **Places Directory** — shared list of studios and venues.
- **Credits** — links Person + Role to a Work with instrument detail.
- **Inline editing** — Work detail page is the primary UX; click any field to edit in place.
- **Read-only share link** — sharable view with field-level visibility control per Work.
- **Soft deletes only** — nothing is ever hard-deleted.

## Coding Conventions

- Functional components with TypeScript — no class components
- Named exports only — no default exports except Next.js pages
- Props interfaces in separate `*Props.ts` files (per existing template pattern)
- Component folders: `ComponentName/ComponentName.tsx` + `ComponentNameProps.ts` + `index.ts`
- All human-readable strings in `src/constants/` — **never inline** (see [concepts/string-constants.md](./concepts/string-constants.md))
- Tests import the same constants as components — no hardcoded strings in test assertions

## Checklist: Adding or Modifying a Component

1. Read [concepts/string-constants.md](./concepts/string-constants.md) before writing any UI text
2. Add all human-readable strings to `src/constants/` before using them in JSX
3. Use the same constants in tests — no raw strings in `getByText()`, `getByRole()`, etc.
4. `yarn lint` must pass
5. `tsc --noEmit` must pass
6. `yarn test` must pass

## Testing

- `yarn test` — run full suite
- `yarn test:coverage` — coverage report
- **POC target (RL2):** 20% coverage
- **MVP target (RL3):** 50% coverage

## Git Flow

- Feature branches → PR to `develop`
- `develop` → `staging` → `main`
- PRs to `staging`/`main` from other branches require Code Quality gate
- PRs from `develop` → `staging` or `staging` → `main` skip Code Quality (already gated at develop)

## PR Review Checklist

Before approving any PR:

- [ ] No human-readable strings hardcoded in JSX, aria-labels, placeholders, or error messages
- [ ] New constants follow naming convention: function/purpose, not the text itself
- [ ] Tests use imported constants, not raw strings
- [ ] `yarn lint` passes
- [ ] `tsc --noEmit` passes
- [ ] `yarn test` passes

## Never

- Hard-delete records (use soft delete via API)
- Expose credentials or secrets in code or committed environment files
- Commit with failing lint, type errors, or broken tests
- Hardcode human-readable strings inline in components
