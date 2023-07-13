import { GuidePanel } from '@navikt/ds-react';

import { useSøker, useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';
import { hentSøkerFornavn } from '~/utils/hentSøkerInfo';

import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './veilederhilsen.module.css';

const VeilederHilsen: React.FC = () => {
  const søker = useSøker();
  const { brukerHilsen, veilederhilsenInnhold } = useTekster(
    ESanityMappe.FORSIDE,
  );

  return (
    <GuidePanel poster className={`${css.poster}`}>
      <div className={`${css.tekstInnholdMellomrom}`}>
        <TekstBlokk
          tekstblokk={brukerHilsen}
          typografi={ETypografiTyper.HEADING_H2}
          flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }}
        />
      </div>
      <TekstBlokk tekstblokk={veilederhilsenInnhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
