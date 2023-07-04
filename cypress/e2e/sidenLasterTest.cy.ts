describe('Grunnleggende Test', () => {
  it('Besøker Lokal og finner den', () => {
    cy.visit('http://localhost:3000');
  });
});
