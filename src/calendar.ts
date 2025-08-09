export function renderCalendar(container: HTMLElement | null, document: Document): void {
  if (container) {
    const calendar = document.createElement('div');
    calendar.classList.add('calendar');

    const monthName = new Date().toLocaleString('default', { month: 'long' });
    const monthNameElement = document.createElement('div');
    monthNameElement.classList.add('month-name');
    monthNameElement.textContent = monthName;
    calendar.appendChild(monthNameElement);

    container.appendChild(calendar);
  }
}