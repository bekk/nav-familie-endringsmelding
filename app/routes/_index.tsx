import type { V2_MetaFunction } from '@remix-run/node';
import css from './_index.module.css';
import { useLoaderData } from '@remix-run/react';
import { createClient } from '@sanity/client';
import React, { useEffect, useState } from 'react';
import VeilederHilsen from '../komponenter/veilederhilsen/veilederhilsen';
import {
  ESanityApiKey,
  LocaleType,
  SanityDokument,
} from '~/typer/sanity/sanity';
import TekstBlokk from '~/komponenter/tekstBlokk/tekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
//import { LocaleType, Sprakvelger } from '@navikt/familie-sprakvelger';

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

const sanityKlient = createClient({
  projectId: 'd8ycstqz',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});

const API_URL_BACKEND: string =
  'http://localhost:8099/local/cookie?redirect=http://localhost:3000&issuerId=selvbetjening&audience=aud-localhost';

export const loader = async () => {
  const forsideTekst = await sanityKlient.fetch<SanityDokument[]>(
    '*[steg == "FORSIDE"]',
  );
  return { forsideTekst };
};

export default function Index() {
  const { forsideTekst } = useLoaderData<typeof loader>();
  const spraak: LocaleType = LocaleType.nb;

  const dokumenter: Map<ESanityApiKey, SanityDokument> = new Map();
  forsideTekst.map(dokument => dokumenter.set(dokument.api_navn, dokument));

  const punktlisteDokument = dokumenter.get(ESanityApiKey.PUNKTLISTE);
  const tittelPunktlisteDokument = dokumenter.get(
    ESanityApiKey.TITTEL_PUNKTLISTE,
  );

  const [navn, settNavn] = useState('');

  useEffect(() => {
    let data;
    const hentData = async () => {
      data = await fetch(API_URL_BACKEND).catch(err => console.log);
    };
    hentData();
    if (data) {
      settNavn(data);
    }
  }, [navn]);

  return (
    <div className={`${css.sentrerTekst} ${css.fyllSide}`}>
      <div className={`${css.innholdkonteiner}`}>
        <TekstBlokk
          tekstblokk={dokumenter.get(ESanityApiKey.TITTEL)}
          valgBlock={spraak}
          typografi={TypografiTyper.StegHeadingH1}
        />
        {navn ? navn : 'Ingen'}
        <VeilederHilsen
          punktlisteDokument={punktlisteDokument}
          tittelPunktlisteDokument={tittelPunktlisteDokument}
          spraak={spraak}
        />
      </div>
    </div>
  );
}
