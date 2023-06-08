import type { V2_MetaFunction } from '@remix-run/node';
import { BodyShort } from '@navikt/ds-react';

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
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <BodyShort>Hello sommerstudenter!</BodyShort>
    </div>
  );
}
