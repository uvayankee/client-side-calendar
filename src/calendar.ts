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
    container.appendChild(calendar);
  }
}