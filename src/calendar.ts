interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
}

const events: CalendarEvent[] = [];

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

    const monthSelect = document.createElement('select');
    monthSelect.classList.add('month-select');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index.toString();
      option.textContent = month;
      if (index === date.getMonth()) {
        option.selected = true;
      }
      monthSelect.appendChild(option);
    });
    monthSelect.addEventListener('change', () => {
      const newDate = new Date(date);
      newDate.setMonth(parseInt(monthSelect.value));
      renderCalendar(container, document, newDate);
    });
    header.appendChild(monthSelect);

    const yearSelect = document.createElement('select');
    yearSelect.classList.add('year-select');
    const currentYear = date.getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      const option = document.createElement('option');
      option.value = i.toString();
      option.textContent = i.toString();
      if (i === currentYear) {
        option.selected = true;
      }
      yearSelect.appendChild(option);
    }
    yearSelect.addEventListener('change', () => {
      const newDate = new Date(date);
      newDate.setFullYear(parseInt(yearSelect.value));
      renderCalendar(container, document, newDate);
    });
    header.appendChild(yearSelect);

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
      const fullDate = new Date(date.getFullYear(), date.getMonth(), i);
      dayElement.dataset.date = fullDate.toISOString().split('T')[0]; // YYYY-MM-DD

      // Display events for this day
      const eventsForDay = events.filter(event => event.date === dayElement.dataset.date);
      if (eventsForDay.length > 0) {
        const eventList = document.createElement('ul');
        eventsForDay.forEach(event => {
          const eventItem = document.createElement('li');
          eventItem.classList.add('event');
          eventItem.textContent = event.title;
          eventList.appendChild(eventItem);
        });
        dayElement.appendChild(eventList);
      }

      dayElement.addEventListener('click', () => {
        renderEventForm(fullDate, container, document);
      });
      daysGrid.appendChild(dayElement);
    }

    calendar.appendChild(daysGrid);
    container.appendChild(calendar);
  }
}

function renderEventForm(date: Date, container: HTMLElement | null, document: Document): void {
  if (container) {
    // Remove any existing form to ensure only one is open at a time
    const existingForm = document.querySelector('.event-form-modal');
    if (existingForm) {
      existingForm.remove();
    }

    const modal = document.createElement('div');
    modal.classList.add('event-form-modal');

    const formContent = document.createElement('div');
    formContent.classList.add('event-form-content');

    const dateHeader = document.createElement('h3');
    dateHeader.textContent = `Create Event for ${date.toDateString()}`;
    formContent.appendChild(dateHeader);

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    formContent.appendChild(titleLabel);
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'event-title';
    formContent.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    formContent.appendChild(descriptionLabel);
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'event-description';
    formContent.appendChild(descriptionInput);

    const saveButton = document.createElement('button');
    saveButton.id = 'save-event';
    saveButton.textContent = 'Save Event';
    saveButton.addEventListener('click', () => {
      const title = titleInput.value;
      const description = descriptionInput.value;

      if (title && description) {
        const newEvent: CalendarEvent = {
          id: Date.now().toString(), // Simple unique ID
          title,
          description,
          date: date.toISOString().split('T')[0],
        };
        events.push(newEvent);
        modal.remove(); // Close the modal
        renderCalendar(container, document, date); // Re-render calendar to show event
      } else {
        alert('Please enter both title and description.');
      }
    });
    formContent.appendChild(saveButton);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      modal.remove();
    });
    formContent.appendChild(closeButton);

    modal.appendChild(formContent);
    container.appendChild(modal);
  }
}