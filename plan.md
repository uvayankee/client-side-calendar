# Deployment Preparation
1. [x] Set up the necessary directories and package.json for building the system.
2. [x] Set up Github Actions, and ensure the pipeline passes.
3. [x] Build the initial landing page and deploy it using github pages
4. [x] Build a cypress test suite and ensure that the Javascript on the page loads.  Integrate that test suie into the build
5. [x] Build a simple calendar that displays the current month on that landing page
6. [x] Augment the calendar to allow the user to click forward a month and back a month
7. [x] Modify the github actions to only run on PR, not also on push
8. [x] The calendar should show all the days of the month week by week, with each week starting on Sunday.
9. [x] The user should be able to select the year and month from drop downs on the calendar 
10. [x] The user should be able to create an event
11. [x] The user should be able to save events between sessions
12. Add husky to the repo - ensure precommit runs build and test
13. Implement eslint and add linting to the precommit
14. The full month calendar view is not displaying.  The user only sees the month and year name, but not a grid of the days.  This will likely require cypress testing to solve
15. The user should be able to choose a weekly view
16. The user should be able to to click forward a week and backward a week in the weekly view
17. The user should be able to choose a daily view
