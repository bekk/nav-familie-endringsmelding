import { json } from '@remix-run/node';

import { loggInn } from '~/server/authorization';
import { hentSanityData } from '~/server/hentSanityData.server';
import { hentSøker } from '~/server/hentSøker.server';
import { API_TOKEN_NAME, commitSession, getSession } from '~/sessions';
import { EYtelse } from '~/typer/ytelse';

interface Props {
  request: Request;
  ytelse: EYtelse;
}

export const ytelseLoader = async ({ request, ytelse }: Props) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has(API_TOKEN_NAME)) {
    await loggInn(session);
  }
  const tekstData = await hentSanityData(ytelse);
  const søkerData = await hentSøker(session);

  const data = {
    tekstData,
    søkerData,
  };
  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
