import type { V2_MetaFunction } from '@remix-run/node';

import Forside from '~/sider/Forside';

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
  return <Forside />;
}
