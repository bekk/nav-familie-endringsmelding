import søkerMock from '~/mock/søkerMock';
import { fetchWithToken } from '~/server/authorization';
import { EMiljø } from '~/typer/miljø';
import { ISøker } from '~/typer/søker';

const STI: string = '/api/oppslag/soker';
const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;
const API_URL_BACKEND: string =
  'https://nav-familie-endringsmelding-api.fly.dev/' + STI;

export const hentSøker = async (request: Request): Promise<ISøker> => {
  switch (process.env.ENV) {
    case EMiljø.LOKAL:
      return (await fetchWithToken(request, LOKAL_URL_BACKEND)).json();
    case EMiljø.PRODUKSJON:
      return (await fetchWithToken(request, API_URL_BACKEND)).json();
    default:
      return Promise.resolve(søkerMock);
  }
};
