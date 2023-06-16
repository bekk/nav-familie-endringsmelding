import type { V2_MetaFunction } from '@remix-run/node';
import { Heading } from '@navikt/ds-react';
import css from './_index.module.css';
import { useLoaderData } from '@remix-run/react';
import { createClient } from '@sanity/client';
import React from 'react';
import VeilederHilsen from '../komponenter/veilederhilsen/veilederhilsen';
import { ESanityApiKey, SanityDokument } from '~/typer/sanity/sanity';
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

export const loader = async () => {
  const forsideTekst = await sanityKlient.fetch<SanityDokument[]>(
    '*[steg == "FORSIDE"]',
  );
  return { forsideTekst };
};

export default function Index() {
  const { forsideTekst } = useLoaderData<typeof loader>();

  const dokumenter: Map<ESanityApiKey, SanityDokument> = new Map();
  forsideTekst.map(dokument => dokumenter.set(dokument.api_navn, dokument));

  console.log(dokumenter.get(ESanityApiKey.TITTEL));

  return (
    <div className={`${css.sentrerTekst} ${css.fyllSide}`}>
      <div className={`${css.innholdkonteiner}`}>
        <Heading level="1" size="xlarge">
          {/*       {     tittel ? tittel[0].nb[0].children[0].text : 'Sanity funker ikke'}
           */}{' '}
        </Heading>
        <VeilederHilsen />
        {/*         <p>{punktliste ? punktliste[0].nb[0].children[0].text :"Ingen punktliste her"}</p>
         */}{' '}
      </div>
    </div>
  );
}
