import { json, Session } from '@remix-run/node';

import postResponseMock from '~/mock/postResponseMock';
import { EMiljø } from '~/typer/miljø';

import { postMedToken } from './authorization';

const STI: string = '/api/send-inn/ks';
const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;
const API_URL_BACKEND: string =
  'https://nav-familie-endringsmelding-api.fly.dev' + STI;

export async function sendEndringsmelding(
  endringsmelding: string,
  session: Session,
): Promise<Response> {
  const requestInfo = new Request(LOKAL_URL_BACKEND, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
  });

  switch (process.env.ENV) {
    case EMiljø.LOKAL:
      return await postMedToken(
        session,
        LOKAL_URL_BACKEND,
        requestInfo,
        JSON.stringify(endringsmelding),
      );
    case EMiljø.PRODUKSJON:
      return await postMedToken(
        session,
        API_URL_BACKEND,
        requestInfo,
        JSON.stringify(endringsmelding),
      );
    default:
      return json(postResponseMock);
  }
}
