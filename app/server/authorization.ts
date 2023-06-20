import cookie from 'cookie';

const AUTHORIZATION_HEADER = 'authorization';
const WONDERWALL_ID_TOKEN_HEADER = 'x-wonderwall-id-token';

export const fetchWithToken = async (
  remixRequest: Request,
  url: string,
  requestInfo?: Request,
): Promise<Response> => {
  const headersFromRequest = requestInfo?.headers || {};
  const token = await prepareSecuredRequest(remixRequest);
  const headersWithToken = new Headers({
    ...headersFromRequest,
    [AUTHORIZATION_HEADER]: token.authorization,
    [WONDERWALL_ID_TOKEN_HEADER]: '',
  });
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
