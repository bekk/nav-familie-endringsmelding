import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import { Heading } from '@navikt/ds-react';
import css from './_index.module.css';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { createClient } from '@sanity/client';
import React, { useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
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
  setTimeout(function callbackFunction() {}, 20000);
  const data = await sanityKlient.fetch('*');

  return { data };
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  /**
   * Setter Loading som en state, viser spinner hvis det er tilfellet.
   */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  console.log(data);

  return (
    <div className={`${css.sentrerTekst} ${css.fyllSide}`}>
      <div className={`${css.innholdkonteiner}`}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Heading level="1" size="xlarge">
              {/* {data ? data[1].en[0].children[0].text : 'Sanity funker ikke'} */}
            </Heading>
            <VeilederHilsen />
          </>
        )}
      </div>
    </div>
  );
}
