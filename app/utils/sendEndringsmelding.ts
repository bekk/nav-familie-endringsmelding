import { fetchWithTokenPost } from '~/server/authorization';

const STI: string = '/api/send-inn/ba';
const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;

export async function sendEndringsmelding(tekst: string) {
  const requestRemix = new Request(LOKAL_URL_BACKEND);

  return (
    await fetchWithTokenPost(requestRemix, LOKAL_URL_BACKEND, tekst)
  ).json();
}
