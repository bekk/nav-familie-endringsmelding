import { fetchWithTokenPost } from '~/server/authorization';

const STI: string = '/api/send-inn/ba';
const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;
//const API_URL_BACKEND: string ='https://nav-familie-endringsmelding-api.fly.dev/' + STI;

export async function sendEndringsmelding(tekst: string) {
  const requestRemix = new Request(LOKAL_URL_BACKEND);
  switch (process.env.ENV) {
    //Skal være i case EMiljø.LOKAL
    default:
      return (
        await fetchWithTokenPost(requestRemix, LOKAL_URL_BACKEND, tekst)
      ).json();
    /*    case EMiljø.PRODUKSJON:
      return (await fetchWithToken(request, API_URL_BACKEND)).json(); */
    /* default:
      return Promise.resolve(søkerMock); */
  }
}
