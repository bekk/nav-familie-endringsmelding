import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { useTekster } from '~/hooks/contextHooks';
import css from './veiledning.module.css';
import { ESteg } from '~/typer/common';
import { ETypografiTyper } from '~/typer/typografi';

const Veiledning: React.FC = () => {
  const { veilederInnhold } = useTekster(ESteg.SEND_ENDRINGER);

  return (
    <GuidePanel className={`${css.veilederPanel}`}>
      <TekstBlokk
        tekstblokk={veilederInnhold}
        typografi={ETypografiTyper.BodyShort}
      />
    </GuidePanel>
  );
};

export default Veiledning;
