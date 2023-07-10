describe('Forside tester', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Tekst laster fra Sanity', () => {
    cy.get(`[data-testid='forsideTittel']`).contains('Endringsmelding');
  });
  it('Språkvelger endrer språk', () => {
    cy.get(`[data-testid='språkvelger']`).select('en');
    cy.get(`[data-testid='forsideTittel']`).contains('Change message');
  });
  it('Fornavn hentet fra backend', () => {
    //Må endre til det fornavnet vi vil hente, mocket
    cy.get(`[data-testid='hilsenFornavn']`).contains('Hei, Fornavn!');
  });
  it('Kan ikke gå videre før samtykkepanel er bekreftet', () => {
    cy.get(`[data-testid='startKnapp']`).click();
    //Kan feilmeldingsteksten kanskje hentes på en annen måte eller sjekkes på en annen måte sånn at testen funker selvom teksten blir endret
    cy.get(`[data-testid='samtykkepanelFeilmelding']`).contains(
      'Du må samtykke før du kan fortsette',
    );
  });
  it('Samtykkepanel bekreftet før man kan gå videre', () => {
    cy.get(`[data-testid='samtykkepanel']`).check();
    cy.get(`[data-testid='startKnapp']`).click();
  });
  it('Kan trykke på link til personvernerklæring', () => {
    cy.get(`[data-testid='linkPersonvern']`).click();
  });
});
