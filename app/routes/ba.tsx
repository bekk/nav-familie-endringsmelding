import { json, LoaderArgs, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { loggInn } from '~/server/authorization';
import { hentSanityData } from '~/server/hentSanityData.server';
import { hentSøker } from '~/server/hentSøker.server';
import { API_TOKEN_NAME, commitSession, getSession } from '~/sessions';
import { ELocaleType } from '~/typer/felles';
import { ITekstinnhold } from '~/typer/sanity/sanity';
import { EYtelse } from '~/typer/ytelse';

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has(API_TOKEN_NAME)) {
    await loggInn(session);
  }
  const tekstData = await hentSanityData(EYtelse.BARNETRYGD);
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

export default function BarnetrygdIndex() {
  const { tekstData, søkerData } = useLoaderData<typeof loader>();
  const [språk, settSpråk] = useState<ELocaleType>(ELocaleType.NB);
  const [tekster, settTekster] = useState<ITekstinnhold>(tekstData);
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);
  const [endringsmeldingMottattDato, settEndringsmeldingMottattDato] =
    useState('');

  return (
    <Outlet
      context={{
        sanityTekster: [tekster, settTekster],
        språk: [språk, settSpråk],
        søker: søkerData,
        erSamtykkeBekreftet: [erSamtykkeBekreftet, settErSamtykkeBekreftet],
        endringsmeldingMottattDato: [
          endringsmeldingMottattDato,
          settEndringsmeldingMottattDato,
        ],
      }}
    />
  );
}
