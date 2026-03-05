---
name: build
description: Build one or all packages. Usage: /build [react|forms|auth-ui|all]
---

Build packages in this monorepo. **Always use Node >= 20** (`nvm use` first).

Argument: `$ARGUMENTS`

## Rules

- If argument is empty or `all`, build all 3 packages **in dependency order**: `@flatui/react` → `@flatui/forms` → `@flatui/auth-ui`
- If argument is `react` or `flatui`, build `@flatui/react`
- If argument is `forms`, build `@flatui/forms`
- If argument is `auth-ui` or `auth`, build `@flatui/auth-ui`
- Stop on first failure and report the error clearly
- Use `source ~/.nvm/nvm.sh && nvm use 20` before running commands

## Commands

```bash
# Single package
yarn workspace @flatui/react build
yarn workspace @flatui/forms build
yarn workspace @flatui/auth-ui build

# All (dependency order)
yarn workspace @flatui/react build && yarn workspace @flatui/forms build && yarn workspace @flatui/auth-ui build
```

## On Failure

If the build fails:
1. Read the error output
2. Identify the root cause (TypeScript error, missing import, etc.)
3. Fix the issue
4. Re-run the build to confirm it passes
