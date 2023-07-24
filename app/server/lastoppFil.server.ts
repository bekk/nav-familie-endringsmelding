import { Session } from '@remix-run/node';

import { EMiljø } from '~/typer/miljø';

import { postFilMedToken } from './authorization';

const hentFilOpplastningURL = () => {
  const sti = '/api/dokument';

  switch (process.env.ENV) {
    case EMiljø.LOKAL:
    case EMiljø.MOCK:
    case EMiljø.PRODUKSJON:
    default:
      return 'https://nav-familie-endringsmelding-api.fly.dev' + sti;
  }
};

async function lastOppFil(fil: File, session: Session) {
  const url = hentFilOpplastningURL();
  return await postFilMedToken(session, url, undefined, fil).then(
    async response => {
      try {
        const responseJson = await response.json();
        return { response: responseJson, status: response.status };
      } catch (e) {
        return { status: response.status };
      }
    },
  );
}

export default lastOppFil;
