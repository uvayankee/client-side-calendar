"use strict";
(() => {
  // src/calendar.ts
  var Calendar = class {
    constructor(container) {
      this.container = container;
    }
    render() {
      const calendarDiv = document.createElement("div");
      calendarDiv.className = "calendar";
      this.container.appendChild(calendarDiv);
    }
  };

  // src/main.ts
  function main() {
    const calendarContainer = document.getElementById("calendar-container");
    if (calendarContainer) {
      const calendar = new Calendar(calendarContainer);
      calendar.render();
    }
  }
  document.addEventListener("DOMContentLoaded", main);
})();
//# sourceMappingURL=index.js.map
