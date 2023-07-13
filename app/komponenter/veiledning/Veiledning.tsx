import { GuidePanel } from '@navikt/ds-react';

import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';

import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './veiledning.module.css';

const Veiledning: React.FC = () => {
  const { veilederInnhold } = useTekster(ESanityMappe.SEND_ENDRINGER);

  return (
    <GuidePanel className={`${css.veilederPanel}`}>
      <TekstBlokk
        tekstblokk={veilederInnhold}
        typografi={ETypografiTyper.BODY_SHORT}
      />
    </GuidePanel>
  );
};

export default Veiledning;
