import { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { IEndringsmelding } from '~/typer/endringsmelding';
import { ELocaleType } from '~/typer/felles';
import { EYtelse } from '~/typer/ytelse';
import { ytelseLoader } from '~/utils/ytelseLoader';

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return await ytelseLoader({ request: request, ytelse: EYtelse.BARNETRYGD });
};

export default function BarnetrygdIndex() {
  const { tekstData, søkerData } = useLoaderData<typeof loader>();
  const [språk, settSpråk] = useState<ELocaleType>(ELocaleType.NB);
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);
  const [endringsmelding, settEndringsmelding] = useState<IEndringsmelding>({
    tekst: '',
    dokumenter: [],
  });
  const [endringsmeldingMottattDato, settEndringsmeldingMottattDato] =
    useState('');

  return (
    <Outlet
      context={{
        sanityTekster: tekstData,
        språk: [språk, settSpråk],
        søker: søkerData,
        erSamtykkeBekreftet: [erSamtykkeBekreftet, settErSamtykkeBekreftet],
        endringsmelding: [endringsmelding, settEndringsmelding],
        endringsmeldingMottattDato: [
          endringsmeldingMottattDato,
          settEndringsmeldingMottattDato,
        ],
        ytelse: EYtelse.BARNETRYGD,
      }}
    />
  );
}
