import { renderCalendar } from './calendar.js';

function main() { // Initialize the calendar application with linting
  const calendarContainer = document.getElementById('calendar-container');

  if (calendarContainer) {
    renderCalendar(calendarContainer, document);
  }
}

// @ts-expect-error: main function is globally exposed for Cypress tests
window.main = main;

document.addEventListener('DOMContentLoaded', main);