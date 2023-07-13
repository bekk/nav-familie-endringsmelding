import { Session } from '@remix-run/node';

import { fetchMedToken } from '~/server/authorization';
import { EMiljø } from '~/typer/miljø';
import { ISøker } from '~/typer/søker';

const STI: string = '/api/oppslag/soker';
const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;
const API_URL_BACKEND: string =
  'https://nav-familie-endringsmelding-api.fly.dev' + STI;

export const hentSøker = async (session: Session): Promise<ISøker> => {
  switch (process.env.ENV) {
    case EMiljø.LOKAL:
      return (await fetchMedToken(session, LOKAL_URL_BACKEND)).json();
    case EMiljø.PRODUKSJON:
    default:
      return (await fetchMedToken(session, API_URL_BACKEND)).json();
  }
};
