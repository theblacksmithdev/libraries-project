---
name: test
description: Run tests for one or all packages. Usage: /test [react|forms|auth-ui|all]
---

Run tests in this monorepo. **Always use Node >= 20** (`nvm use` first).

Argument: `$ARGUMENTS`

## Rules

- If argument is empty or `all`, run tests for all 3 packages in order
- If argument is `react` or `flatui`, test `@flatui/react`
- If argument is `forms`, test `@flatui/forms`
- If argument is `auth-ui` or `auth`, test `@flatui/auth-ui`
- Use `source ~/.nvm/nvm.sh && nvm use 20` before running commands

## Commands

```bash
# Single package
yarn workspace @flatui/react test
yarn workspace @flatui/forms test
yarn workspace @flatui/auth-ui test

# All
yarn workspace @flatui/react test && yarn workspace @flatui/forms test && yarn workspace @flatui/auth-ui test
```

## On Failure

If tests fail:
1. Read the failing test output carefully
2. Identify whether it's a test bug or a code bug
3. Fix the issue
4. Re-run only the failing package's tests to confirm
5. Report what was wrong and what you fixed
