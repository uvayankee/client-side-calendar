"use strict";
(() => {
  // src/calendar.ts
  var events = [];
  function renderCalendar(container, document2, date = /* @__PURE__ */ new Date()) {
    if (container) {
      container.innerHTML = "";
      const calendar = document2.createElement("div");
      calendar.classList.add("calendar");
      const header = document2.createElement("div");
      header.classList.add("header");
      const prevButton = document2.createElement("button");
      prevButton.classList.add("prev-month");
      prevButton.textContent = "< Prev";
      prevButton.addEventListener("click", () => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() - 1);
        renderCalendar(container, document2, newDate);
      });
      header.appendChild(prevButton);
      const monthSelect = document2.createElement("select");
      monthSelect.classList.add("month-select");
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      months.forEach((month, index) => {
        const option = document2.createElement("option");
        option.value = index.toString();
        option.textContent = month;
        if (index === date.getMonth()) {
          option.selected = true;
        }
        monthSelect.appendChild(option);
      });
      monthSelect.addEventListener("change", () => {
        const newDate = new Date(date);
        newDate.setMonth(parseInt(monthSelect.value));
        renderCalendar(container, document2, newDate);
      });
      header.appendChild(monthSelect);
      const yearSelect = document2.createElement("select");
      yearSelect.classList.add("year-select");
      const currentYear = date.getFullYear();
      for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        const option = document2.createElement("option");
        option.value = i.toString();
        option.textContent = i.toString();
        if (i === currentYear) {
          option.selected = true;
        }
        yearSelect.appendChild(option);
      }
      yearSelect.addEventListener("change", () => {
        const newDate = new Date(date);
        newDate.setFullYear(parseInt(yearSelect.value));
        renderCalendar(container, document2, newDate);
      });
      header.appendChild(yearSelect);
      const nextButton = document2.createElement("button");
      nextButton.classList.add("next-month");
      nextButton.textContent = "Next >";
      nextButton.addEventListener("click", () => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + 1);
        renderCalendar(container, document2, newDate);
      });
      header.appendChild(nextButton);
      calendar.appendChild(header);
      const daysGrid = document2.createElement("div");
      daysGrid.classList.add("days-grid");
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      weekdays.forEach((day) => {
        const weekdayElement = document2.createElement("div");
        weekdayElement.classList.add("weekday");
        weekdayElement.textContent = day;
        daysGrid.appendChild(weekdayElement);
      });
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const numDaysInMonth = lastDayOfMonth.getDate();
      const firstDayOfWeek = firstDayOfMonth.getDay();
      for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document2.createElement("div");
        emptyDay.classList.add("day", "empty");
        daysGrid.appendChild(emptyDay);
      }
      for (let i = 1; i <= numDaysInMonth; i++) {
        const dayElement = document2.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i.toString();
        const fullDate = new Date(date.getFullYear(), date.getMonth(), i);
        dayElement.dataset.date = fullDate.toISOString().split("T")[0];
        const eventsForDay = events.filter((event) => event.date === dayElement.dataset.date);
        if (eventsForDay.length > 0) {
          const eventList = document2.createElement("ul");
          eventsForDay.forEach((event) => {
            const eventItem = document2.createElement("li");
            eventItem.classList.add("event");
            eventItem.textContent = event.title;
            eventList.appendChild(eventItem);
          });
          dayElement.appendChild(eventList);
        }
        dayElement.addEventListener("click", () => {
          renderEventForm(fullDate, container, document2);
        });
        daysGrid.appendChild(dayElement);
      }
      calendar.appendChild(daysGrid);
      container.appendChild(calendar);
    }
  }
  function renderEventForm(date, container, document2) {
    if (container) {
      const existingForm = document2.querySelector(".event-form-modal");
      if (existingForm) {
        existingForm.remove();
      }
      const modal = document2.createElement("div");
      modal.classList.add("event-form-modal");
      const formContent = document2.createElement("div");
      formContent.classList.add("event-form-content");
      const dateHeader = document2.createElement("h3");
      dateHeader.textContent = `Create Event for ${date.toDateString()}`;
      formContent.appendChild(dateHeader);
      const titleLabel = document2.createElement("label");
      titleLabel.textContent = "Title:";
      formContent.appendChild(titleLabel);
      const titleInput = document2.createElement("input");
      titleInput.type = "text";
      titleInput.id = "event-title";
      formContent.appendChild(titleInput);
      const descriptionLabel = document2.createElement("label");
      descriptionLabel.textContent = "Description:";
      formContent.appendChild(descriptionLabel);
      const descriptionInput = document2.createElement("textarea");
      descriptionInput.id = "event-description";
      formContent.appendChild(descriptionInput);
      const saveButton = document2.createElement("button");
      saveButton.id = "save-event";
      saveButton.textContent = "Save Event";
      saveButton.addEventListener("click", () => {
        const title = titleInput.value;
        const description = descriptionInput.value;
        if (title && description) {
          const newEvent = {
            id: Date.now().toString(),
            // Simple unique ID
            title,
            description,
            date: date.toISOString().split("T")[0]
          };
          events.push(newEvent);
          modal.remove();
          renderCalendar(container, document2, date);
        } else {
          alert("Please enter both title and description.");
        }
      });
      formContent.appendChild(saveButton);
      const closeButton = document2.createElement("button");
      closeButton.textContent = "Close";
      closeButton.addEventListener("click", () => {
        modal.remove();
      });
      formContent.appendChild(closeButton);
      modal.appendChild(formContent);
      container.appendChild(modal);
    }
  }

  // src/main.ts
  function main() {
    const calendarContainer = document.getElementById("calendar-container");
    if (calendarContainer) {
      renderCalendar(calendarContainer, document);
    }
  }
  window.main = main;
  document.addEventListener("DOMContentLoaded", main);
})();
//# sourceMappingURL=main.js.map
