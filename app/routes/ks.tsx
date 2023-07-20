import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { ELocaleType } from '~/typer/felles';
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
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);
  const [endringsmeldingMottattDato, settEndringsmeldingMottattDato] =
    useState('');

  return (
    <Outlet
      context={{
        sanityTekster: tekstData,
        språk: [språk, settSpråk],
        søker: søkerData,
        erSamtykkeBekreftet: [erSamtykkeBekreftet, settErSamtykkeBekreftet],
        endringsmeldingMottattDato: [
          endringsmeldingMottattDato,
          settEndringsmeldingMottattDato,
        ],
        ytelse: EYtelse.KONTANTSTØTTE,
      }}
    />
  );
}
