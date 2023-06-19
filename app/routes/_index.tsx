import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import { Heading } from '@navikt/ds-react';
import css from './_index.module.css';
import { useLoaderData } from '@remix-run/react';
import { createClient } from '@sanity/client';
import React, { useEffect, useState } from 'react';
import Spinner from '~/komponenter/Spinner';
import VeilederHilsen from '../komponenter/veilederhilsen/veilederhilsen';

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

export const loader: LoaderFunction = async () => {
  const data = await sanityKlient.fetch('*');

  return { data };
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const [laster, settLaster] = useState(true);

  useEffect(() => {
    if (data) {
      settLaster(false);
    }
  }, [data]);

  return (
    <div className={`${css.sentrerTekst} ${css.fyllSide}`}>
      <div className={`${css.innholdKonteiner}`}>
        {laster ? (
          <Spinner />
        ) : (
          <>
            <Heading level="1" size="xlarge">
              Endringsmelding
            </Heading>
            <VeilederHilsen />
          </>
        )}
      </div>
    </div>
  );
}
