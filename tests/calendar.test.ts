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

  it('should render all days of the month, starting on Sunday', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      const date = new Date(2025, 7, 1); // August 2025. August 1, 2025 is a Friday.
      renderCalendar(container, document, date);

      const daysGrid = container.querySelector('.days-grid');
      expect(daysGrid).not.toBeNull();

      const dayElements = daysGrid?.querySelectorAll('.day:not(.empty)');
      expect(dayElements?.length).toBe(31); // August has 31 days

      // Check if the first day (1) is in the correct position (Friday)
      // August 1, 2025 is a Friday. Sunday is index 0, Friday is index 5.
      // There should be 5 empty days before the 1st.
      const firstDayElement = daysGrid?.children[12]; // 0-indexed, accounting for 7 weekday headers
      expect(firstDayElement?.textContent).toBe('1');

      // Check if the weekday headers are present and correct
      const weekdayHeaders = daysGrid?.querySelectorAll('.weekday');
      expect(weekdayHeaders?.length).toBe(7);
      expect(weekdayHeaders?.[0]?.textContent).toBe('Sun');
      expect(weekdayHeaders?.[1]?.textContent).toBe('Mon');
      expect(weekdayHeaders?.[2]?.textContent).toBe('Tue');
      expect(weekdayHeaders?.[3]?.textContent).toBe('Wed');
      expect(weekdayHeaders?.[4]?.textContent).toBe('Thu');
      expect(weekdayHeaders?.[5]?.textContent).toBe('Fri');
      expect(weekdayHeaders?.[6]?.textContent).toBe('Sat');

    } else {
      fail('container not found');
    }
  });
});