import { Calendar } from './calendar';

function main() {
  const calendarContainer = document.getElementById('calendar-container');

  if (calendarContainer) {
    const calendar = new Calendar(calendarContainer);
    calendar.render();
  }
}

// @ts-ignore
window.main = main;

document.addEventListener('DOMContentLoaded', main);
