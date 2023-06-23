import søkerMock from '~/mock/søkerMock';
import { fetchWithToken } from '~/server/authorization';
import { EMiljø } from '~/typer/miljø';

const API_URL_BACKEND: string = 'http://localhost:8099/api/oppslag/soker';

export const hentSøker = async (request: Request): Promise<any> => {
  if (process.env.ENV == EMiljø.LOKAL) {
    const mockInnhold = new Blob([JSON.stringify(søkerMock, null, 2)], {
      type: 'application/json',
    });
    return new Response(mockInnhold);
  }

  const søker = await fetchWithToken(request, API_URL_BACKEND);
  return søker;
};
