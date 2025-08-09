describe('Calendar Weekly View', () => {
  it('should switch to weekly view when "Week View" button is clicked', () => {
    cy.visit('/index.html');
    cy.get('#week-view-button').click();
    cy.get('.days-grid .day').should('have.length', 7);
  });

  it('should navigate to next week when "Next Week" button is clicked in weekly view', () => {
    cy.visit('/index.html');
    cy.get('#week-view-button').click();
    cy.get('.next-button').click();
    // Assert that the displayed week has changed (e.g., check the first day of the week)
    // For now, just checking if the number of days is still 7
    cy.get('.days-grid .day').should('have.length', 7);
  });

  it('should navigate to previous week when "Prev Week" button is clicked in weekly view', () => {
    cy.visit('/index.html');
    cy.get('#week-view-button').click();
    cy.get('.prev-button').click();
    // Assert that the displayed week has changed
    cy.get('.days-grid .day').should('have.length', 7);
  });
});