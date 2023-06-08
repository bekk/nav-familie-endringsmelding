# Nav familie endringsmelding

Applikasjonen bruker remix. Se den offisielle dokumentasjonen for mer info

- [Remix Docs](https://remix.run/docs)

## Installasjon

For å komme i gang med applikasjonen, følg disse trinnene:

1. Få token fra en tjommi og legg det til som miljøvariabel `NPM_AUTH_TOKEN`

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

6. Lag endringsmeldingsløsning for NAV 🚀

## Deploye

Filen [deploy.yml](.github%2Fworkflows%2Fdeploy.yml) sørger for at vi deployer hver gang vi merger med master 🚀
