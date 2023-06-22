import { fetchWithToken } from '~/server/authorization';

const API_URL_BACKEND: string = 'http://localhost:8099/api/oppslag/soker';

export const hentSøker = async (request: Request): Promise<any> => {
  const søker = await fetchWithToken(request, API_URL_BACKEND);
  return søker;
};
