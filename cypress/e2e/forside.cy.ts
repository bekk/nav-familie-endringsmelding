describe('Forside tester', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/ba');
  });
  it('Tekst laster fra Sanity', () => {
    cy.get(`[data-testid='forsideTittel']`).contains('Endringsmelding');
  });
  it('Språkvelger endrer språk', () => {
    cy.get(`[data-testid='språkvelger']`).click();
    cy.get(`[data-testid='en']`).click();
    cy.get(`[data-testid='forsideTittel']`).contains('Change message');
  });
  it('Fornavn hentet fra backend', () => {
    //TODO: Endre til det fornavnet vi vil hente, mocket
    cy.get(`[data-testid='hilsenFornavn']`).contains('Hei, Askeladden!');
  });
  it('Kan ikke gå videre før samtykkepanel er bekreftet', () => {
    cy.get(`[data-testid='startKnapp']`).click();
    // TODO: Sjekk mot tekst fra Sanity, ikke hardkodes
    cy.get(`[data-testid='samtykkepanelFeilmelding']`).contains(
      'Du må samtykke før du kan fortsette',
    );
  });
  it('Skal ikke få gå videre før samtykkepanel er bekreftet etter feilmelding', () => {
    cy.get(`[data-testid='startKnapp']`).click();
    // TODO: Sjekk mot tekst fra Sanity, ikke hardkodes
    cy.get(`[data-testid='samtykkepanelFeilmelding']`).contains(
      'Du må samtykke før du kan fortsette',
    );
    cy.get(`[data-testid='samtykkepanel']`).check();
    cy.get(`[data-testid='startKnapp']`).click();
  });
  it('Samtykkepanel bekreftet før man kan gå videre', () => {
    cy.get(`[data-testid='samtykkepanel']`).check();
    cy.get(`[data-testid='startKnapp']`).click();
  });
  it('Kan trykke på link til personvernerklæring', () => {
    cy.get(`[data-testid='linkPersonvern']`).click();
  });
});
