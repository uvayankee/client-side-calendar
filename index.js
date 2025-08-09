"use strict";
(() => {
  // src/calendar.ts
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
      const monthNameElement = document2.createElement("div");
      monthNameElement.classList.add("month-name");
      monthNameElement.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });
      header.appendChild(monthNameElement);
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
      container.appendChild(calendar);
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
//# sourceMappingURL=index.js.map
