import { json, Session } from '@remix-run/node';

import postResponseMock from '~/mock/postResponseMock';
import { IEndringsmelding } from '~/typer/endringsmelding';
import { EMiljø } from '~/typer/miljø';

import { postMedToken } from './authorization';

export async function sendEndringsmelding(
  endringsmelding: IEndringsmelding,
  ytelseSti: string,
  session: Session,
): Promise<Response> {
  const STI: string = '/api/send-inn/' + ytelseSti;
  const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;
  const API_URL_BACKEND: string =
    'https://nav-familie-endringsmelding-api.fly.dev' + STI;

  const requestInfo = new Request(LOKAL_URL_BACKEND, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    method: 'POST',
  });

  switch (process.env.ENV) {
    case EMiljø.LOKAL:
      return await postMedToken(
        session,
        LOKAL_URL_BACKEND,
        requestInfo,
        endringsmelding,
      );
    case EMiljø.MOCK:
      return json(postResponseMock);
    case EMiljø.PRODUKSJON:
    default:
      return await postMedToken(
        session,
        API_URL_BACKEND,
        requestInfo,
        endringsmelding,
      );
  }
}
