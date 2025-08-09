import { renderCalendar } from './calendar';

function main() {
  const calendarContainer = document.getElementById('calendar-container');

  if (calendarContainer) {
    renderCalendar(calendarContainer, document);
  }
}

// @ts-ignore
window.main = main;

document.addEventListener('DOMContentLoaded', main);
