import { Session } from '@remix-run/node';

import { API_TOKEN_NAME } from '~/sessions';
import { IEndringsmelding } from '~/typer/endringsmelding';
import { EMiljø } from '~/typer/miljø';

export const fetchMedToken = async (
  session: Session,
  url: string,
  requestInfo?: Request,
): Promise<Response> => {
  const headersMedToken = await lagHeadersMedToken(session, requestInfo);
  return fetch(url, {
    headers: headersMedToken,
    method: 'GET',
  });
};

export const postMedToken = async (
  session: Session,
  url: string,
  requestInfo?: Request,
  payload?: IEndringsmelding,
): Promise<Response> => {
  const headersMedToken = await lagHeadersMedToken(session, requestInfo);
  return fetch(url, {
    headers: headersMedToken,
    method: 'Post',
    body: JSON.stringify(payload),
  });
};

const lagHeadersMedToken = async (session: Session, requestInfo?: Request) => {
  //const headersFromRequest = requestInfo?.headers || {};
  const token = await prepareSecuredRequest(session);
  const headerSomObjekt = {
    'Content-Type': 'application/json',
    accept: 'application/json',
    authorization: token.authorization,
    'x-wonderwall-id-token': '',
  };
  return new Headers(headerSomObjekt);
};

const prepareSecuredRequest = async (session: Session) => {
  const token = (await session.get(API_TOKEN_NAME)) ?? '';

  // TODO: TokenX-exchange i NAV-miljø
  return {
    authorization: `Bearer ${token}`,
  };
};

async function hentCookieFraBackend() {
  const apiUrl = hentApiUrl();
  const url =
    apiUrl + '/local/cookie?issuerId=tokenx&audience=familie-endringsmelding';

  const cookieResponse = await fetch(url);
  return await cookieResponse.json();
}

export async function loggInn(session: Session) {
  session.set(API_TOKEN_NAME, (await hentCookieFraBackend()).value);
}

const hentApiUrl = () => {
  switch (process.env.ENV) {
    case EMiljø.LOKAL:
      return 'http://localhost:8099';
    case EMiljø.PRODUKSJON:
    default:
      return 'https://nav-familie-endringsmelding-api.fly.dev';
  }
};
