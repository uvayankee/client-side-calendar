# Gemini Summary

This file is for Gemini's internal thoughts and learnings about the repository and its workflow.

## Learnings from this session:

*   **Cypress Setup:** The `npx cypress open` command is interactive and should be avoided in a headless environment. Instead, `npx cypress install --force` and then running `cypress run --headless` is preferred.
*   **CI/CD Configuration:** The `ci.yml` workflow needs to be configured to trigger on all branches for pull requests, not just `main`, to ensure checks run on feature branches.
*   **Jest/JSDOM Setup:** When using `jsdom` with Jest, `TextEncoder` and `TextDecoder` might need to be polyfilled, and the `document` object needs to be explicitly passed to functions that interact with the DOM if they are being tested in isolation from the global `document`.
*   **File Augmentation:** I must be extremely careful to *augment* existing files rather than overwriting them. Always read the file content first, then append or replace specific sections.
*   **Git Workflow:** When finishing a task, the correct workflow is `git checkout main && git pull`. If that doesn't work, then `git reset --hard origin/main` should be used. Avoid `git reset --hard HEAD~1`.