import { LinkIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import type { V2_MetaFunction } from '@remix-run/node';

import { EYtelse } from '~/typer/ytelse';
import { hentPathForYtelse } from '~/utils/hentPath';

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
      <Link
        href={hentPathForYtelse(EYtelse.BARNETRYGD)}
        className={`${css.ytelseLink}`}
      >
        <LinkIcon title="link-icon" fontSize="1.5rem" />
        <p>Barnetrygd</p>
      </Link>
      <Link
        href={hentPathForYtelse(EYtelse.KONTANTSTØTTE)}
        className={`${css.ytelseLink}`}
      >
        <LinkIcon title="link-icon" fontSize="1.5rem" />
        <p>Kontantstøtte</p>
      </Link>
    </div>
  );
}
