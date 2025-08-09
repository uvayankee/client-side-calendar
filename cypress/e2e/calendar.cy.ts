
describe('Calendar', () => {
  it('should display the calendar grid', () => {
    cy.visit('/index.html');
    cy.get('.days-grid').should('be.visible');
    cy.get('.day').should('have.length.greaterThan', 0);
  });
});
