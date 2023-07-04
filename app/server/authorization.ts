import { EMiljø } from '~/typer/miljø';
import { Session } from '@remix-run/node';
import { API_TOKEN_NAME } from '~/sessions';

export const fetchWithToken = async (
  session: Session,
  url: string,
  requestInfo?: Request,
): Promise<Response> => {
  const headersFromRequest = requestInfo?.headers || {};
  const token = await prepareSecuredRequest(session);
  const headersWithToken = new Headers({
    ...headersFromRequest,
    authorization: token.authorization,
    'x-wonderwall-id-token': '',
  });
  return fetch(url, {
    ...requestInfo,
    headers: headersWithToken,
  });
};

const prepareSecuredRequest = async (session: Session) => {
  const token = (await hentApiToken(session)) ?? '';

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

async function hentApiToken(session: Session) {
  return session.get(API_TOKEN_NAME);
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
