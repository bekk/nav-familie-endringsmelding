describe('Steg1-test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/ba');
    cy.get(`[data-testid='samtykkepanel']`).check();
    cy.get(`[data-testid='startKnapp']`).click();
    cy.wait(1000);
  });
  it('Sjekker at tekst laster fra Sanity', () => {
    cy.get(`[data-testid='overskriftSteg1']`).contains('Send endringer');
  });
  it('Sjekker at stegindikator har rett antall steg', () => {
    cy.get('.navds-stepper').children().should('have.length', 3);
  });
  //TODO: finne en måte å teste at rett steg på stegIndikator er aktivt. Prøvd metoder liknende denne, uten hell:
  /*   it('Sjekker at stegindikator har attributt activeStep, () => {
    cy.get('.navds-stepper').invoke('attr', 'activeStep').should('exist');
  }); */
  it('Stegindikator er på rett steg', () => {
    cy.get('.navds-stepper__step').eq(1).contains('2');
  });
  it('Sjekke at overskrift til fritekstfelt er tilstede', () => {
    cy.get(`[data-testid='fritekstfeltTittel']`).contains(
      'Hva ønsker du å endre?',
    );
  });
  it('Finner tomt fritekstfelt', () => {
    cy.get(`[data-testid='fritekstfelt']`);
    cy.get('.navds-textarea__counter').contains('1000 tegn igjen');
  });
  it('Klikke gå videre for å trigge feilmelding', () => {
    cy.get(`[data-testid='knappVidereSteg1']`).click();
    cy.get('.navds-error-message').should('exist');
  });
  it('Skrive godkjent tekst til fritekstfelt og trykke videre', () => {
    cy.get(`[data-testid='fritekstfelt']`).type('Endringsmelding');
    cy.get('.navds-textarea__counter').contains('985 tegn igjen');
    cy.get('.navds-error-message').should('not.exist');
    cy.get(`[data-testid='knappVidereSteg1']`).click();
  });
});
