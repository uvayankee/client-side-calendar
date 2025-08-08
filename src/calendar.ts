export class Calendar {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render(): void {
    const calendarDiv = document.createElement('div');
    calendarDiv.className = 'calendar';
    this.container.appendChild(calendarDiv);
  }
}
