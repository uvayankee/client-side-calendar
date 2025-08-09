import { JSDOM } from 'jsdom';
import { renderCalendar } from '../src/calendar';

describe('Calendar', () => {
  it('should render the calendar', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      renderCalendar(container, document, new Date());
      expect(container.querySelector('.calendar')).not.toBeNull();
    } else {
      fail('container not found');
    }
  });

  it('should display the current month and year', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      const today = new Date();
      renderCalendar(container, document, today);
      const monthNameElement = container.querySelector('.month-name');
      expect(monthNameElement).not.toBeNull();
      if (monthNameElement) {
        const expectedMonthYear = today.toLocaleString('default', { month: 'long', year: 'numeric' });
        expect(monthNameElement.textContent).toBe(expectedMonthYear);
      }
    } else {
      fail('container not found');
    }
  });

  it('should navigate to the next month when the next button is clicked', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      const initialDate = new Date();
      renderCalendar(container, document, initialDate);

      const nextButton = container.querySelector('.next-month') as HTMLElement;
      expect(nextButton).not.toBeNull();
      if (nextButton) {
        nextButton.click();
        const expectedMonthYear = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
        const monthNameElement = container.querySelector('.month-name');
        expect(monthNameElement).not.toBeNull();
        if (monthNameElement) {
          expect(monthNameElement.textContent).toBe(expectedMonthYear);
        }
      }
    } else {
      fail('container not found');
    }
  });

  it('should navigate to the previous month when the previous button is clicked', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      const initialDate = new Date();
      renderCalendar(container, document, initialDate);

      const prevButton = container.querySelector('.prev-month') as HTMLElement;
      expect(prevButton).not.toBeNull();
      if (prevButton) {
        prevButton.click();
        const expectedMonthYear = new Date(initialDate.getFullYear(), initialDate.getMonth() - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
        const monthNameElement = container.querySelector('.month-name');
        expect(monthNameElement).not.toBeNull();
        if (monthNameElement) {
          expect(monthNameElement.textContent).toBe(expectedMonthYear);
        }
      }
    } else {
      fail('container not found');
    }
  });
});