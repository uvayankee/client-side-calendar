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

      const monthSelect = container.querySelector('.month-select') as HTMLSelectElement;
      const yearSelect = container.querySelector('.year-select') as HTMLSelectElement;

      expect(monthSelect).not.toBeNull();
      expect(yearSelect).not.toBeNull();

      if (monthSelect && yearSelect) {
        expect(parseInt(monthSelect.value)).toBe(today.getMonth());
        expect(parseInt(yearSelect.value)).toBe(today.getFullYear());
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
        const expectedMonth = (initialDate.getMonth() + 1) % 12;
        const expectedYear = initialDate.getMonth() === 11 ? initialDate.getFullYear() + 1 : initialDate.getFullYear();

        const monthSelect = container.querySelector('.month-select') as HTMLSelectElement;
        const yearSelect = container.querySelector('.year-select') as HTMLSelectElement;

        expect(monthSelect).not.toBeNull();
        expect(yearSelect).not.toBeNull();

        if (monthSelect && yearSelect) {
          expect(parseInt(monthSelect.value)).toBe(expectedMonth);
          expect(parseInt(yearSelect.value)).toBe(expectedYear);
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
        const expectedMonth = (initialDate.getMonth() - 1 + 12) % 12;
        const expectedYear = initialDate.getMonth() === 0 ? initialDate.getFullYear() - 1 : initialDate.getFullYear();

        const monthSelect = container.querySelector('.month-select') as HTMLSelectElement;
        const yearSelect = container.querySelector('.year-select') as HTMLSelectElement;

        expect(monthSelect).not.toBeNull();
        expect(yearSelect).not.toBeNull();

        if (monthSelect && yearSelect) {
          expect(parseInt(monthSelect.value)).toBe(expectedMonth);
          expect(parseInt(yearSelect.value)).toBe(expectedYear);
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

  it('should update the calendar when a new month is selected from the dropdown', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      renderCalendar(container, document, new Date(2025, 0, 1)); // Start with January 2025

      const monthSelect = container.querySelector('.month-select') as HTMLSelectElement;
      expect(monthSelect).not.toBeNull();

      if (monthSelect) {
        monthSelect.value = '2'; // Select March (0-indexed)
        monthSelect.dispatchEvent(new dom.window.Event('change'));

        const expectedMonth = 2; // March
        const expectedYear = 2025;

        const newMonthSelect = container.querySelector('.month-select') as HTMLSelectElement;
        const newYearSelect = container.querySelector('.year-select') as HTMLSelectElement;

        expect(newMonthSelect).not.toBeNull();
        expect(newYearSelect).not.toBeNull();

        if (newMonthSelect && newYearSelect) {
          expect(parseInt(newMonthSelect.value)).toBe(expectedMonth);
          expect(parseInt(newYearSelect.value)).toBe(expectedYear);
        }
      }
    } else {
      fail('container not found');
    }
  });

  it('should update the calendar when a new year is selected from the dropdown', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      renderCalendar(container, document, new Date(2025, 0, 1)); // Start with January 2025

      const yearSelect = container.querySelector('.year-select') as HTMLSelectElement;
      expect(yearSelect).not.toBeNull();

      if (yearSelect) {
        yearSelect.value = '2026';
        yearSelect.dispatchEvent(new dom.window.Event('change'));

        const expectedMonth = 0; // January
        const expectedYear = 2026;

        const newMonthSelect = container.querySelector('.month-select') as HTMLSelectElement;
        const newYearSelect = container.querySelector('.year-select') as HTMLSelectElement;

        expect(newMonthSelect).not.toBeNull();
        expect(newYearSelect).not.toBeNull();

        if (newMonthSelect && newYearSelect) {
          expect(parseInt(newMonthSelect.value)).toBe(expectedMonth);
          expect(parseInt(newYearSelect.value)).toBe(expectedYear);
        }
      }
    } else {
      fail('container not found');
    }
  });

  it('should allow creating and displaying an event', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      const date = new Date(2025, 7, 15); // August 15, 2025
      renderCalendar(container, document, date);

      // Simulate clicking on a day to open the event creation form
      const targetDate = new Date(2025, 7, 15); // August 15, 2025
      const targetDateString = targetDate.toISOString().split('T')[0];
      const dayElement = container.querySelector(`.day[data-date="${targetDateString}"]`) as HTMLElement;
      expect(dayElement).not.toBeNull();
      dayElement.click();

      // Simulate filling and submitting the form
      const eventTitleInput = container.querySelector('#event-title') as HTMLInputElement;
      const eventDescriptionInput = container.querySelector('#event-description') as HTMLInputElement;
      const saveEventButton = container.querySelector('#save-event') as HTMLElement;

      expect(eventTitleInput).not.toBeNull();
      expect(eventDescriptionInput).not.toBeNull();
      expect(saveEventButton).not.toBeNull();

      if (eventTitleInput && eventDescriptionInput && saveEventButton) {
        eventTitleInput.value = 'Test Event';
        eventDescriptionInput.value = 'This is a test event.';
        saveEventButton.click();

        // Re-query the dayElement after re-render
        const updatedDayElement = container.querySelector(`.day[data-date="${targetDateString}"]`) as HTMLElement;

        // Verify the event is displayed on the calendar
        const eventDisplay = updatedDayElement?.querySelector('.event');
        expect(eventDisplay).not.toBeNull();
        expect(eventDisplay?.textContent).toContain('Test Event');
      }
    } else {
      fail('container not found');
    }
  });
});