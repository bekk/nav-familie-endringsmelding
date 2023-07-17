import { LinkIcon } from '@navikt/aksel-icons';
import type { V2_MetaFunction } from '@remix-run/node';

import css from './_index.module.css';

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
    <div className={`${css.linkKonteiner}`}>
      <a href="ba" className={`${css.ytelseLink}`}>
        <LinkIcon title="link-icon" fontSize="1.5rem" />
        <p>Barnetrygd</p>
      </a>
      <a href="ks" className={`${css.ytelseLink}`}>
        <LinkIcon title="link-icon" fontSize="1.5rem" />
        <p>Kontantstøtte</p>
      </a>
    </div>
  );
}
