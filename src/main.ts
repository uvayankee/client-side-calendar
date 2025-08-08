import { Calendar } from './calendar';

const calendarContainer = document.getElementById('calendar-container');

if (calendarContainer) {
  const calendar = new Calendar(calendarContainer);
  calendar.render();
}
