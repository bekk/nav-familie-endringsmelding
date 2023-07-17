import { LinkIcon } from '@navikt/aksel-icons';
import type { V2_MetaFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

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
  const navigate = useNavigate();

  function håndterKnappeTrykk(ytelse: EYtelse) {
    navigate(hentPathForYtelse(ytelse));
  }
  return (
    <div className={`${css.linkKonteiner}`}>
      <a
        href="ba"
        className={`${css.ytelseLink}`}
        onClick={event => håndterKnappeTrykk(EYtelse.BARNETRYGD)}
      >
        <LinkIcon title="link-icon" fontSize="1.5rem" />
        <p>Barnetrygd</p>
      </a>
      <a
        href="ks"
        className={`${css.ytelseLink}`}
        onClick={event => håndterKnappeTrykk(EYtelse.KONTANTSTØTTE)}
      >
        <LinkIcon title="link-icon" fontSize="1.5rem" />
        <p>Kontantstøtte</p>
      </a>
    </div>
  );
}
