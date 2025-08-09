import { JSDOM } from 'jsdom';
import { renderCalendar } from '../src/calendar';

describe('Calendar', () => {
  it('should render the calendar', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      renderCalendar(container, document);
      expect(container.querySelector('.calendar')).not.toBeNull();
    } else {
      fail('container not found');
    }
  });

  it('should display the current month', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      renderCalendar(container, document);
      const monthNameElement = container.querySelector('.month-name');
      expect(monthNameElement).not.toBeNull();
      if (monthNameElement) {
        const monthName = new Date().toLocaleString('default', { month: 'long' });
        expect(monthNameElement.textContent).toBe(monthName);
      }
    } else {
      fail('container not found');
    }
  });
});