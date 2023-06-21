import type { V2_MetaFunction } from '@remix-run/node';
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

export default function SendEndringsmelding() {
  return <p>Send Endringsmelding</p>;
}
