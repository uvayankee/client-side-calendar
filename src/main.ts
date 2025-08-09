import { renderCalendar } from './calendar';

function main() { // Initialize the calendar application with linting
  const calendarContainer = document.getElementById('calendar-container');

  if (calendarContainer) {
    renderCalendar(calendarContainer, document);
  }
}

// @ts-ignore
window.main = main;

document.addEventListener('DOMContentLoaded', main);
