import '../src/main';

describe('main.ts', () => {
  beforeEach(() => {
    // Set up the DOM with the content of index.html
    document.body.innerHTML = `
      <main>
        <div id="calendar-container"></div>
      </main>
    `;
  });

  it('should render the calendar when the DOM is loaded', () => {
    // Dispatch the DOMContentLoaded event to trigger main()
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const calendarContainer = document.getElementById('calendar-container');
    expect(calendarContainer).not.toBeNull();
    // The calendar should have been rendered inside the container
    expect(calendarContainer!.querySelector('.calendar')).not.toBeNull();
  });
});
