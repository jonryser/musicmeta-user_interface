# Versioning

## Overview

This project uses [semantic versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`) defined in `package.json`.
Tags and GitHub releases are environment-scoped: a version is suffixed based on which environment it was deployed to.

## Tag Format

| Environment | Tag format        | Example          |
| ----------- | ----------------- | ---------------- |
| `develop`   | `VERSION.develop` | `1.1.0.develop`  |
| `staging`   | `VERSION.staging` | `1.1.0.staging`  |
| `main`      | `VERSION`         | `1.1.0`          |

## When Tags and Releases Are Created

Tags and GitHub releases are created **only on successful deployment** to an environment.
If code is merged but never deployed, no tag or release is created.

## Version Bump Rules

- **Before merging to `develop`**: the Code Quality gate checks that the version in `package.json`
  does not already have a corresponding `VERSION.develop` tag. If the tag exists, the PR is blocked.
- **If the code was never deployed** after the last merge, you may merge again with the same version —
  no tag exists yet, so the check passes.
- **If the code was deployed**, a tag was created. Any subsequent PR to `develop` must bump the version
  in `package.json` or the check will fail.

The same logic will apply to `staging` and `main` once their deploy workflows are in place.

## Workflow

```text
feature branch → PR → develop → staging → main
                  ↑
          Code Quality gate checks version here
```

1. Update the version in `package.json` if a deploy has occurred since your last merge.
2. Open a PR targeting `develop`.
3. The Code Quality workflow verifies the `VERSION.develop` tag does not already exist.
4. On merge, the app is deployed to the `develop` environment (infrastructure and deploy workflow pending).
5. On successful deploy, `VERSION.develop` tag and GitHub release are created.
6. Promotion to `staging` and `main` follows the same pattern with their respective suffixes.

## Checking the Current Version

```sh
cat package.json | jq -r '.version'
```

## Checking Existing Tags

```sh
git tag --list
```
