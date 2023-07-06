describe('Steg1-test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/send-endringsmelding');
  });
  it('Sjekker at tekst laster fra Sanity', () => {
    cy.get('.navds-heading--small').contains('Send endringer');
  });
  it('Finner tekst i veiledning', () => {
    cy.get(`[data-testid='veiledningSteg1']`).contains(
      'Veiledning på endringsmelding',
    );
  });
  it('Sjekker at stegindikator har rett antall steg', () => {
    cy.get('.navds-stepper').children().should('have.length', 2);
  });
  //denne går ikke:
  /*   it('Sjekker at stegindikator har rattributt activeStep, () => {
    cy.get('.navds-stepper').invoke('attr', 'activeStep').should('exist');
  }); */
  it('Stegindikator er på rett steg', () => {
    cy.get('.navds-stepper__step').eq(1).contains('2');
  });
});
