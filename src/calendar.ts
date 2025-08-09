export function renderCalendar(container: HTMLElement | null, document: Document, date: Date = new Date()): void {
  if (container) {
    container.innerHTML = ''; // Clear existing calendar

    const calendar = document.createElement('div');
    calendar.classList.add('calendar');

    const header = document.createElement('div');
    header.classList.add('header');

    const prevButton = document.createElement('button');
    prevButton.classList.add('prev-month');
    prevButton.textContent = '< Prev';
    prevButton.addEventListener('click', () => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      renderCalendar(container, document, newDate);
    });
    header.appendChild(prevButton);

    const monthNameElement = document.createElement('div');
    monthNameElement.classList.add('month-name');
    monthNameElement.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    header.appendChild(monthNameElement);

    const nextButton = document.createElement('button');
    nextButton.classList.add('next-month');
    nextButton.textContent = 'Next >';
    nextButton.addEventListener('click', () => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      renderCalendar(container, document, newDate);
    });
    header.appendChild(nextButton);

    calendar.appendChild(header);

    const daysGrid = document.createElement('div');
    daysGrid.classList.add('days-grid');

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
      const weekdayElement = document.createElement('div');
      weekdayElement.classList.add('weekday');
      weekdayElement.textContent = day;
      daysGrid.appendChild(weekdayElement);
    });

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    // Add empty divs for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('day', 'empty');
      daysGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let i = 1; i <= numDaysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = i.toString();
      daysGrid.appendChild(dayElement);
    }

    calendar.appendChild(daysGrid);
    container.appendChild(calendar);
  }
}