import cookie from 'cookie';

export const fetchWithToken = async (
  remixRequest: Request,
  url: string,
  requestInfo?: Request,
): Promise<Response> => {
  const headersFromRequest = requestInfo?.headers || {};
  console.log('headersFromRequest', headersFromRequest);
  const token = await prepareSecuredRequest(remixRequest);
  const headersWithToken = new Headers({
    ...headersFromRequest,
    authorization: token.authorization,
    'x-wonderwall-id-token': '',
  });
  console.log('requestInfo', requestInfo);
  return fetch(url, {
    ...requestInfo,
    headers: headersWithToken,
  });
};

const utledToken = (req: Request) => {
  const cookies = req.headers.get('Cookie');
  const cookiesFromHeader = cookies ? cookie.parse(cookies) : {};
  return cookiesFromHeader['localhost-idtoken'];
};

const prepareSecuredRequest = async (req: Request) => {
  const token = utledToken(req);
  // TODO: TokenX-exchange i NAV-miljø
  return {
    authorization: `Bearer ${token}`,
  };
};
/* 
export const fetchWithTokenPost = async (
  remixRequest: Request,
  url: string,
  endringsmeldingTekst: string,
  requestInfo?: Request,
): Promise<Response> => {
  //const headersFromRequest = requestInfo?.headers || {};
  console.log('fetch url', url);
  const token = await prepareSecuredRequest(remixRequest);
  const headersWithToken = new Headers({
    authorization: token.authorization,
    'x-wonderwall-id-token': '',
  });
  return fetch(url, {
    ...requestInfo,
    method: 'POST',
    headers: headersWithToken,
    body: JSON.stringify(endringsmeldingTekst),
  });
}; */
