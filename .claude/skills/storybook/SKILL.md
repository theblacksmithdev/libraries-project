---
name: storybook
description: Launch Storybook dev server for a package. Usage: /storybook [react|forms|auth-ui]
---

Launch Storybook for a package. **Always use Node >= 20** (`nvm use` first).

Argument: `$ARGUMENTS`

## Rules

- If argument is `react` or `flatui` or empty, launch `@flatui/react` storybook on port 6006
- If argument is `forms`, launch `@flatui/forms` storybook on port 6008
- If argument is `auth-ui` or `auth`, launch `@flatui/auth-ui` storybook on port 6007
- Use `source ~/.nvm/nvm.sh && nvm use 20` before running
- Run in background so the user can continue working

## Commands

```bash
yarn workspace @flatui/react storybook      # port 6006
yarn workspace @flatui/forms storybook      # port 6008
yarn workspace @flatui/auth-ui storybook    # port 6007
```

## Port Map

| Package | Port |
|---------|------|
| @flatui/react | 6006 |
| @flatui/auth-ui | 6007 |
| @flatui/forms | 6008 |
