PROJECT: MusicMeta UI

MusicMeta UI is a Next.js/TypeScript web application — the primary frontend for the MusicMeta platform.
Musicians use it to create, track, and share metadata for their musical works across the full lifecycle:
from inspiration through composition, recording, mixing, mastering, and release.

TECH STACK:
- Next.js 14+ (App Router)
- React 18+
- TypeScript 5+
- Apollo Client v3 (GraphQL, connecting to musicmeta-api)
- Jest for unit testing
- ESLint + Prettier for linting/formatting

REPO STRUCTURE:
- src/pages/          → Next.js pages (Pages Router)
- src/components/     → Reusable React components
- src/utils/          → Utility functions and helpers
- src/constants/      → Application constants
- graphql/            → GraphQL query/mutation files
- public/             → Static assets
- templates/          → Component scaffolding templates

KEY CONCEPTS:
- Work: the primary entity — a musical composition/recording. Each has a detail page.
- WorkVersion: a snapshot fork of a Work. Versions form a tree with breadcrumb navigation.
- People Directory: shared address book of musicians, engineers, producers.
- Places Directory: shared list of studios and venues.
- Credits: links Person + Role to a Work with specific instrument detail.
- Inline editing: the Work detail page is the primary UX — click any field to edit in place.
- Read-only share link: sharable view with field-level visibility control per Work.

ARCHITECTURE:
- GraphQL API consumed via Apollo Client (musicmeta-api Absinthe backend)
- TypeScript types generated from GraphQL schema (graphql-codegen)
- Auth: NextAuth.js with Google OAuth provider
- Soft deletes only — nothing is hard-deleted

CODING CONVENTIONS:
- Functional components with TypeScript — no class components
- Named exports only — no default exports except Next.js pages
- Props interfaces defined in separate `*Props.ts` files (per existing template pattern)
- Component folders: ComponentName/ComponentName.tsx + ComponentNameProps.ts + index.ts
- `yarn lint` must pass before committing
- `tsc --noEmit` must pass before committing

TESTING:
- `yarn test` — run full suite
- `yarn test:coverage` — coverage report
- Target: 20% coverage for POC (RL2), 50% for MVP (RL3)

GIT:
- Feature branches → PR to `develop`
- `develop` → `staging` → `main`
- PRs to `staging`/`main` from other branches require Code Quality gate
- PRs from `develop` → `staging` or `staging` → `main` skip Code Quality (already gated)

NEVER:
- Hard-delete records (use soft delete via API)
- Expose credentials or secrets in code or environment files committed to git
- Commit with failing lint, type errors, or tests
