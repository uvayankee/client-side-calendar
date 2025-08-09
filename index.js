"use strict";
(() => {
  // src/calendar.ts
  function renderCalendar(container, document2) {
    if (container) {
      const calendar = document2.createElement("div");
      calendar.classList.add("calendar");
      const monthName = (/* @__PURE__ */ new Date()).toLocaleString("default", { month: "long" });
      const monthNameElement = document2.createElement("div");
      monthNameElement.classList.add("month-name");
      monthNameElement.textContent = monthName;
      calendar.appendChild(monthNameElement);
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
