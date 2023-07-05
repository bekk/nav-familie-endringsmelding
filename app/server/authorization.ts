import cookie from 'cookie';

export const fetchWithToken = async (
  remixRequest: Request,
  url: string,
  requestInfo?: Request,
  payload?: string,
): Promise<Response> => {
  const headersFromRequest = requestInfo?.headers || {};
  const token = await prepareSecuredRequest(remixRequest);
  const headersWithToken = new Headers({
    ...headersFromRequest,
    authorization: token.authorization,
  });
  return fetch(url, {
    method: requestInfo?.method || 'GET',
    body: payload || null,
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
