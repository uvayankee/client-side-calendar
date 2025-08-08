import { Calendar } from '../src/calendar';

describe('Calendar', () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = '<div id="calendar-container"></div>';
    container = document.getElementById('calendar-container')!;
  });

  it('should render a calendar', () => {
    const calendar = new Calendar(container);
    calendar.render();
    expect(container.querySelector('.calendar')).not.toBeNull();
  });
});
