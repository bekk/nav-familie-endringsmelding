describe('Steg1-test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/send-endringsmelding');
  });
  it('Tekst laster fra Sanity', () => {
    cy.get('.navds-heading--small').contains('Send endringer');
  });
  it('Tekst i veiledning', () => {
    cy.get(`[data-testid='veiledningSteg1']`).contains(
      'Veiledning på endringsmelding',
    );
  });
});
