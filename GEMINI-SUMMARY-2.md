# Gemini Summary - Part 2

## Learnings from recent sessions:

*   **New Repo Details:**
    *   The project is a client-side calendar application built with TypeScript, HTML, and CSS.
    *   It uses `esbuild` for bundling, `jest` for unit testing, `cypress` for end-to-end testing, `eslint` for linting, and `husky` for Git hooks.
    *   Deployment to GitHub Pages is handled via GitHub Actions.

*   **My Preferences / Requirements (from user interactions):**
    *   **No `git commit --amend` or `git push --force`:** Maintain a clean, linear commit history.
    *   **Tests First (TDD):** Always write failing tests (unit and Cypress) before implementing new features or bug fixes.
    *   **Do not overwrite files:** Be extremely careful when modifying files, especially when appending content. Use `append=True` correctly or create new files for new tests.
    *   **Ensure CI passes:** All changes must pass CI checks.
    *   **Clean up background processes:** Before pushing, ensure no lingering `http-server` or other processes are running.

*   **My Current Steps for Working:**

    1.  **Understand the Task:** Read the request and relevant project files (`plan.md`, existing code, tests, config).
    2.  **Create a New Branch:** `git checkout -b feat/task-name` or `git checkout -b fix/bug-name`.
    3.  **Write Failing Tests (Red Phase):**
        *   **Unit Tests:** Create or modify `tests/*.test.ts` files.
        *   **Cypress Tests:** Create or modify `cypress/e2e/*.cy.ts` files.
        *   Run `npm test` and `npm run cy:run` to confirm tests fail as expected.
    4.  **Implement Code (Green Phase):** Write the minimum code necessary in `src/` to make the tests pass.
    5.  **Verify (Green Phase):**
        *   Run `npm test` and `npm run cy:run` to ensure all tests pass.
        *   Run `npm run build` to ensure the project builds successfully.
        *   Run `npm run lint` to ensure no linting errors.
    6.  **Refactor (if needed):** Improve code quality, readability, and maintainability while ensuring all tests remain green.
    7.  **Commit Changes:** `git add . && git commit -m "type: message"` (avoiding amend).
    8.  **Push Changes:** `git push origin current-branch-name` (avoiding force).
    9.  **Create PR:** `gh pr create ...`
    10. **Monitor CI:** Check GitHub Actions for build status. Debug and fix any failures.
    11. **Merge to Main:** Once PR is approved and CI passes, merge to `main`.
    12. **Clean Up (Local):** Switch back to `main` and pull latest changes. Delete feature branch.

*   **Specific Learnings from this session:**

    *   **ESM in Jest:** `jest.config.js` needs to be `jest.config.mjs` when `type: "module"` is in `package.json` to avoid `SyntaxError: Unexpected token 'export'`. This was a key fix for CI.
    *   **Cypress `baseUrl` and `http-server`:** When using `http-server` for Cypress tests, ensure the `baseUrl` in Cypress config (or the `cy.visit()` calls) matches the served directory. Adding a `<base>` tag in `index.html` can interfere with `http-server`'s simple serving, leading to 404s for assets. It's better to remove the `<base>` tag for local Cypress testing if `http-server` is serving from the root of the `dist` folder.
    *   **CI Workflow Triggers:** GitHub Actions workflows need to be explicitly configured to run on `push` to `main` (in addition to `pull_request`) if the build/deploy step should run after a PR merge. This ensures the `main` branch is always built and deployed.
    *   **Husky `pre-push`:** Ensure that commands in `pre-push` hooks (like `npm run cy:run`) are self-contained or have their dependencies (like `http-server`) properly managed within the hook itself (e.g., `npm run serve &` before `npm run cy:run`). Also, be mindful of background processes and ensure they are terminated.
    *   **`npm install` for CI:** Sometimes, even if `package.json` lists a dependency, explicitly running `npm install` (or `npm ci` in CI) can resolve "package not found" errors, especially for transitive dependencies or when switching Node.js versions.
