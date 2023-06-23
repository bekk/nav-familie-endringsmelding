import søkerMock from '~/mock/søkerMock';
import { fetchWithToken } from '~/server/authorization';
import { EMiljø } from '~/typer/miljø';
import { ISøker } from '~/typer/søker';

const API_URL_BACKEND: string = 'http://localhost:8099/api/oppslag/soker';

export const hentSøker = async (request: Request): Promise<ISøker> => {
  if (process.env.ENV == EMiljø.LOKAL) {
    return Promise.resolve(søkerMock);
  }

  return (await fetchWithToken(request, API_URL_BACKEND)).json();
};
