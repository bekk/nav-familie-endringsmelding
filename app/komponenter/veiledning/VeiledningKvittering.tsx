import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { useTekster } from '~/hooks/contextHooks';
import css from './veiledning.module.css';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';

const VeiledningKvittering: React.FC = () => {
  const { kvitteringVeileder } = useTekster(ESanityMappe.KVITTERING);

  return (
    <GuidePanel className={`${css.veilederPanel}`}>
      <TekstBlokk
        tekstblokk={kvitteringVeileder}
        typografi={ETypografiTyper.BODY_SHORT}
      />
    </GuidePanel>
  );
};

export default VeiledningKvittering;
