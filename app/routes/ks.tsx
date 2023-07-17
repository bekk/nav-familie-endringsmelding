import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { ELocaleType } from '~/typer/felles';
import { ITekstinnhold } from '~/typer/sanity/sanity';
import { EYtelse } from '~/typer/ytelse';
import { ytelseLoader } from '~/utils/ytelseLoader';

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return await ytelseLoader({
    request: request,
    ytelse: EYtelse.KONTANTSTØTTE,
  });
};

export default function KontantStøtteIndex() {
  const { tekstData, søkerData } = useLoaderData<typeof loader>();
  const [språk, settSpråk] = useState<ELocaleType>(ELocaleType.NB);
  const [tekster, settTekster] = useState<ITekstinnhold>(tekstData);
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);

  return (
    <Outlet
      context={{
        sanityTekster: [tekster, settTekster],
        språk: [språk, settSpråk],
        søker: søkerData,
        erSamtykkeBekreftet: [erSamtykkeBekreftet, settErSamtykkeBekreftet],
      }}
    />
  );
}
