import type { V2_MetaFunction } from '@remix-run/node';

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

/* 

Ubrukt fil. Her kommer linkene til å komme til de ulike stønader :) 

*/

export default function Index() {
  return <p>Barnetrygd</p>;
}
