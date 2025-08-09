import { JSDOM } from 'jsdom';
import { renderCalendar } from '../src/calendar';

describe('Calendar Weekly View', () => {
  it('should render weekly view when view is \'week\'', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      const date = new Date(2025, 7, 15); // A Friday in August 2025
      renderCalendar(container, document, date, 'week');

      const daysGrid = container.querySelector('.days-grid');
      expect(daysGrid).not.toBeNull();

      const dayElements = daysGrid?.querySelectorAll('.day');
      expect(dayElements?.length).toBe(7); // Should render 7 days for a week

      // Check if the first day is Sunday and the last is Saturday for the week of Aug 15, 2025
      // Aug 15, 2025 is a Friday. So the week is Aug 10 (Sun) to Aug 16 (Sat)
      expect(dayElements?.[0]?.textContent).toBe('10');
      expect(dayElements?.[6]?.textContent).toBe('16');

    } else {
      fail('container not found');
    }
  });

  it('should navigate to the next week when next button is clicked in weekly view', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      const initialDate = new Date(2025, 7, 15); // August 15, 2025
      renderCalendar(container, document, initialDate, 'week');

      const nextButton = container.querySelector('.next-button') as HTMLElement;
      expect(nextButton).not.toBeNull();
      if (nextButton) {
        nextButton.click();

        // Expected date should be 7 days after initialDate
        const expectedDate = new Date(initialDate);
        expectedDate.setDate(initialDate.getDate() + 7);

        const daysGrid = container.querySelector('.days-grid');
        const dayElements = daysGrid?.querySelectorAll('.day');

        // Check if the first day of the new week is correct
        const expectedFirstDayOfWeek = new Date(expectedDate);
        expectedFirstDayOfWeek.setDate(expectedDate.getDate() - expectedDate.getDay());

        expect(dayElements?.[0]?.textContent).toBe(expectedFirstDayOfWeek.getDate().toString());
      }
    } else {
      fail('container not found');
    }
  });

  it('should navigate to the previous week when previous button is clicked in weekly view', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calendar-container"></div></body></html>');
    const document = dom.window.document;
    const container = document.getElementById('calendar-container');

    if (container) {
      const initialDate = new Date(2025, 7, 15); // August 15, 2025
      renderCalendar(container, document, initialDate, 'week');

      const prevButton = container.querySelector('.prev-button') as HTMLElement;
      expect(prevButton).not.toBeNull();
      if (prevButton) {
        prevButton.click();

        // Expected date should be 7 days before initialDate
        const expectedDate = new Date(initialDate);
        expectedDate.setDate(initialDate.getDate() - 7);

        const daysGrid = container.querySelector('.days-grid');
        const dayElements = daysGrid?.querySelectorAll('.day');

        // Check if the first day of the new week is correct
        const expectedFirstDayOfWeek = new Date(expectedDate);
        expectedFirstDayOfWeek.setDate(expectedDate.getDate() - expectedDate.getDay());

        expect(dayElements?.[0]?.textContent).toBe(expectedFirstDayOfWeek.getDate().toString());
      }
    } else {
      fail('container not found');
    }
  });
});
