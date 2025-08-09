import { renderCalendar } from './calendar.js';

function main() { // Initialize the calendar application with linting
  const calendarContainer = document.getElementById('calendar-container');

  if (calendarContainer) {
    renderCalendar(calendarContainer, document, new Date(), 'month');

    const monthViewButton = document.getElementById('month-view-button');
    const weekViewButton = document.getElementById('week-view-button');

    monthViewButton?.addEventListener('click', () => {
      renderCalendar(calendarContainer, document, new Date(), 'month');
    });

    weekViewButton?.addEventListener('click', () => {
      renderCalendar(calendarContainer, document, new Date(), 'week');
    });
  }
}

document.addEventListener('DOMContentLoaded', main);