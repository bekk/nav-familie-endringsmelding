import type { V2_MetaFunction } from '@remix-run/node';
import { Heading } from '@navikt/ds-react';
import css from './_index.module.css';
import React from 'react';

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

export default function Index() {
  return (
    <div className={`${css.sentrerTekst} ${css.fyllSide}`}>
      <div>
        <Heading level="1" size="xlarge">
          Endringsmelding
        </Heading>
      </div>
    </div>
  );
}
