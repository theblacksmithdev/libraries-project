---
name: storybook
description: Launch Storybook dev server for a package. Usage: /storybook [react|forms|auth-ui]
---

Launch Storybook for a package. **Always use Node >= 20** (`nvm use` first).

Argument: `$ARGUMENTS`

## Rules

- If argument is `react` or empty, launch `@blacksmith-ui/react` storybook on port 6006
- If argument is `forms`, launch `@blacksmith-ui/forms` storybook on port 6008
- If argument is `auth-ui` or `auth`, launch `@blacksmith-ui/auth` storybook on port 6007
- Use `source ~/.nvm/nvm.sh && nvm use 20` before running
- Run in background so the user can continue working

## Commands

```bash
yarn workspace @blacksmith-ui/react storybook      # port 6006
yarn workspace @blacksmith-ui/forms storybook      # port 6008
yarn workspace @blacksmith-ui/auth storybook       # port 6007
```

## Port Map

| Package | Port |
|---------|------|
| @blacksmith-ui/react | 6006 |
| @blacksmith-ui/auth | 6007 |
| @blacksmith-ui/forms | 6008 |
