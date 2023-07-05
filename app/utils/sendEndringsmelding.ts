import { fetchWithToken } from '~/server/authorization';

const STI: string = '/api/send-inn/ba';
const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;
//const API_URL_BACKEND: string ='https://nav-familie-endringsmelding-api.fly.dev/' + STI;
//const testUrl: string = 'http://localhost:8099/api/test/hello';

export async function sendEndringsmelding(tekst: string) {
  const requestRemix = new Request(LOKAL_URL_BACKEND);

  const head = new Headers();
  head.append('Content-Type', 'application/json');
  head.append('Accept', 'application/json');

  const requestInfo = new Request(LOKAL_URL_BACKEND, {
    headers: head,
    method: 'POST',
  });

  switch (process.env.ENV) {
    //Skal være i case EMiljø.LOKAL
    default:
      return await fetchWithToken(
        requestRemix,
        LOKAL_URL_BACKEND,
        requestInfo,
        JSON.stringify(tekst),
      );
  }
}
