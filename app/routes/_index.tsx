import type { V2_MetaFunction } from '@remix-run/node';
import { Heading } from '@navikt/ds-react';
import css from './_index.module.css';
import { useLoaderData } from '@remix-run/react';
import { createClient } from '@sanity/client';
import React from 'react';
import VeilederHilsen from '../komponenter/veilederhilsen/veilederhilsen';
import { LocaleType, Sprakvelger } from '@navikt/familie-sprakvelger';

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
  const data = await sanityKlient.fetch('*');
  return { data };
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className={`${css.sentrerTekst} ${css.fyllSide}`}>
      <div className={`${css.innholdkonteiner}`}>
        <Heading level="1" size="xlarge">
          {data ? data[0].nb[0].children[0].text : 'Sanity funker ikke'}
        </Heading>

        <VeilederHilsen />

        <div>
          <Sprakvelger
            støttedeSprak={[LocaleType.nn, LocaleType.nb, LocaleType.en]}
          />
        </div>
      </div>
    </div>
  );
}
