describe('Landing Page', () => {
  it('should load the landing page', () => {
    cy.visit('/index.html');
    cy.get('h1').should('contain', 'Calendar');
  });
});
