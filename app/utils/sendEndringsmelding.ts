import { json } from '@remix-run/node';
import postResponseMock from '~/mock/postResponseMock';
import { fetchWithToken } from '~/server/authorization';
import { EMiljø } from '~/typer/miljø';

const STI: string = '/api/send-inn/ba';
const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;
//const API_URL_BACKEND: string ='https://nav-familie-endringsmelding-api.fly.dev/' + STI;

export async function sendEndringsmelding(
  endringsmelding: string,
  requestRemix: Request,
) {
  const head = new Headers();
  head.append('Content-Type', 'application/json');
  head.append('Accept', 'application/json');

  const requestInfo = new Request(LOKAL_URL_BACKEND, {
    headers: head,
    method: 'POST',
  });

  switch (process.env.ENV) {
    case EMiljø.LOKAL:
      return await fetchWithToken(
        requestRemix,
        LOKAL_URL_BACKEND,
        requestInfo,
        JSON.stringify(endringsmelding),
      );
    //case EMiljø.PRODUKSJON:
    //Her kommer case for bruke av API i produksjon
    default:
      return json(postResponseMock);
  }
}
