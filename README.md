# Nav familie endringsmelding

Applikasjonen skal brukes for å sende endringsmeldinger for ulike stønader til saksbehandlere. Ved å automatisere dette så blir det lettere, enkelere og raskere for både saksbehandler og bruker.

Følgende stønader er støttet i applikasjonen;

- Barnetrygd
- Kontantstøtte

Applikasjonen bruker remix. Se den offisielle dokumentasjonen for mer info

- [Remix Docs](https://remix.run/docs)

## Forutsetninger

### Node v18

Applikasjonen krever at du har node 18.
For å sjekke hvilken versjon av node du har kan du skrive `node -v` i terminalen.
Dersom du har en annen versjon av node kan du bruke nvm til å laste ned og endre versjon:

- Sjekk om du har nvm installert ved å kjøre `nvm -v`
- Dersom du ikke har nvm installert, kan du laste ned nvm ved å følge instruksjonene her: https://github.com/nvm-sh/nvm#installing-and-updating
- Kjør `nvm install 18` i terminalen for å installere node 18
- Kjør `nvm use 18` for å bytte til node 18

## Installasjon

For å komme i gang med applikasjonen, følg disse trinnene:

1. Spør en venn om du kan få en token for å laste ned nav sine frontendpakker, og legg tokenet til i en miljøvariabel som heter `NPM_AUTH_TOKEN`

   1. For å legge til miljøvariabelen kan du i terminalen skrive: `echo 'export NPM_AUTH_TOKEN=<Token fra en venn>' >> ~/.zshenv`
   2. Så må du restarte terminalen: `source ~/.zshrc`
   3. For å dobbeltsjekke at variabelen er satt kan du skrive: `echo $NPM_AUTH_TOKEN` for å printe ut tokenet i terminalen.

2. Klone repositoriet:

   ```sh
   git clone git@github.com:bekk/nav-familie-endringsmelding.git
   ```

3. Naviger til prosjektmappen:

   ```sh
   cd nav-familie-endringsmelding
   ```

4. Installer avhengigheter (NB! krever token fra steg 1.):

   ```sh
   npm install
   ```

5. Start utviklingsserveren:

   ```sh
   npm run dev
   ```

6. Start frontend med cookie fra backend:

```
Start backend (nav-familie-endringsmelding-api) ApplicationLocalLauncher
Gå til http://localhost:8099/local/cookie?redirect=http://localhost:3000&issuerId=tokenx&audience=familie-endringsmelding
Da har du fått. satt en cookie som gjør at du KAN nå backend (men vi har ikke kode for å lese ut cookie og sende videre som header)
```

7. Lag endringsmeldingsløsning for NAV 🚀

## Deploye til prod

Filen [deploy.yml](.github%2Fworkflows%2Fdeploy.yml) sørger for at vi deployer hver gang vi merger med master 🚀

Prod finnes her: [nav-familie-endringsmelding.fly.dev](https://nav-familie-endringsmelding.fly.dev/)

# URLer brukt i Prod:

Følgende liste med URLer er de linken som blir brukt i produksjon:

- **Forsiden** / Frontend : https://nav-familie-endringsmelding.fly.dev/ <br>
  - Deployet av: https://github.com/bekk/nav-familie-endringsmelding
- **API** / Backend : https://nav-familie-endringsmelding-api.fly.dev <br>
  - Deployet av: https://github.com/bekk/nav-familie-endringsmelding-api

## Forside for ulike stønader

Ved å gå til https://nav-familie-endringsmelding.fly.dev/ kommer man til forsiden for send endring applikasjonen. <br>
Hver stønad har sin egen forside og egen logikk. Det er derfor viktig at man sender brukeren til forsiden for den aktuellle stønaden og ikke forsiden for applikasjonen.

### Barnetrygd

Start send endrings melding prosessen ved å gå til forsiden for barnetrygd;
https://nav-familie-endringsmelding.fly.dev/ba

Da vil:

- Steg 1 ligge under `/ba/endringsmelding`
- Kvitteing ligge under `/ba/kvittering`

### Kontantstøtte

Start send endrings melding prosessen ved å gå til forsiden for kontantstøtte;
https://nav-familie-endringsmelding.fly.dev/ks

Da vil:

- Steg 1 ligge under `/ks/endringsmelding`
- Kvitteing ligge under `/ks/kvittering`
