# Repository Specific Learnings

*   **Cypress Setup:** The `npx cypress open` command is interactive and should be avoided in a headless environment. Instead, `npx cypress install --force` and then running `cypress run --headless` is preferred.
*   **CI/CD Configuration:** The `ci.yml` workflow needs to be configured to trigger on all branches for pull requests, not just `main`, to ensure checks run on feature branches.
*   **Jest/JSDOM Setup:** When using `jsdom` with Jest, `TextEncoder` and `TextDecoder` might need to be polyfilled, and the `document` object needs to be explicitly passed to functions that interact with the DOM if they are being tested in isolation from the global `document`.
*   **TDD Workflow:** The importance of following the TDD cycle (Red-Green-Refactor) and committing frequently.

Always keep this `AGENTS.md` file up-to-date with new learnings and best practices for this repository.