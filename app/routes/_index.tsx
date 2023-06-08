import type { V2_MetaFunction } from '@remix-run/node';
import { BodyShort } from '@navikt/ds-react';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <BodyShort>Hello sommerstudenter!</BodyShort>
    </div>
  );
}
