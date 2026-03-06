---
name: build
description: Build one or all packages. Usage: /build [react|forms|auth-ui|all]
---

Build packages in this monorepo. **Always use Node >= 20** (`nvm use` first).

Argument: `$ARGUMENTS`

## Rules

- If argument is empty or `all`, build all 3 packages **in dependency order**: `@blacksmith-ui/react` → `@blacksmith-ui/forms` → `@blacksmith-ui/auth`
- If argument is `react`, build `@blacksmith-ui/react`
- If argument is `forms`, build `@blacksmith-ui/forms`
- If argument is `auth-ui` or `auth`, build `@blacksmith-ui/auth`
- Stop on first failure and report the error clearly
- Use `source ~/.nvm/nvm.sh && nvm use 20` before running commands

## Commands

```bash
# Single package
yarn workspace @blacksmith-ui/react build
yarn workspace @blacksmith-ui/forms build
yarn workspace @blacksmith-ui/auth build

# All (dependency order)
yarn workspace @blacksmith-ui/react build && yarn workspace @blacksmith-ui/forms build && yarn workspace @blacksmith-ui/auth build
```

## On Failure

If the build fails:
1. Read the error output
2. Identify the root cause (TypeScript error, missing import, etc.)
3. Fix the issue
4. Re-run the build to confirm it passes
