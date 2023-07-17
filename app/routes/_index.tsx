import type {
  LoaderArgs,
  LoaderFunction,
  V2_MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';

import { useSettTekster } from '~/hooks/contextHooks';
import Spinner from '~/komponenter/Spinner';
import { loggInn } from '~/server/authorization';
import { hentSanityData } from '~/server/hentSanityData.server';
import { API_TOKEN_NAME, getSession } from '~/sessions';
import Forside from '~/sider/Forside';
import { EYtelse } from '~/typer/ytelse';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Familie endringsmelding' },
    {
      name: 'description',
      content:
        'Endringsmelding for barnetrygd, kontantstøtte og enslig forsørger',
    },
  ];
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has(API_TOKEN_NAME)) {
    await loggInn(session);
  }

  return await hentSanityData(EYtelse.BARNETRYGD);
};

export default function Index() {
  const tekstData = useLoaderData<typeof loader>();
  const settTekster = useSettTekster();

  const [erLastet, settErLastet] = useState<boolean>(false);

  useEffect(() => {
    if (!tekstData) return;

    settTekster(tekstData);
    settErLastet(true);
  }, [tekstData, settErLastet, settTekster]);

  return !erLastet ? <Spinner /> : <Forside />;
}
