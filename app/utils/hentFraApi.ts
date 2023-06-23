import søkerMock from '~/mock/søkerMock';
import { fetchWithToken } from '~/server/authorization';

const API_URL_BACKEND: string = 'http://localhost:8099/api/oppslag/soker';

const ER_MOCK: boolean = true;

export const hentSøker = async (request: Request): Promise<any> => {
  if (ER_MOCK) {
    console.log('Mokker søker data!');
    const mockInnhold = new Blob([JSON.stringify(søkerMock, null, 2)], {
      type: 'application/json',
    });
    return new Response(mockInnhold);
  }

  const søker = await fetchWithToken(request, API_URL_BACKEND);
  return søker;
};
