---
name: check
description: Run tests + build for one or all packages to verify everything works. Usage: /check [react|forms|auth-ui|all]
---

Full verification: tests then build. **Always use Node >= 20** (`nvm use` first).

Argument: `$ARGUMENTS`

## Rules

- If argument is empty or `all`, check all 3 packages in dependency order
- Otherwise check the specified package
- Run tests first, then build — stop on first failure
- Use `source ~/.nvm/nvm.sh && nvm use 20` before running commands

## Steps

For each package being checked:
1. Run `yarn workspace <pkg> test`
2. If tests pass, run `yarn workspace <pkg> build`
3. Report pass/fail status

## Package order (for `all`)

1. `@blacksmith-ui/react` — test then build
2. `@blacksmith-ui/forms` — test then build
3. `@blacksmith-ui/auth` — test then build

## On Failure

If anything fails, stop and:
1. Report which package and step failed
2. Read the error
3. Fix the issue
4. Re-run from the failed step
