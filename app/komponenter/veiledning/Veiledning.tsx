import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { useTekster } from '~/hooks/contextHooks';
import css from './veiledning.module.css';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';

const Veiledning: React.FC = () => {
  const { veilederInnhold } = useTekster(ESanityMappe.SEND_ENDRINGER);

  return (
    <GuidePanel className={`${css.responsivBredde}`}>
      <TekstBlokk
        tekstblokk={veilederInnhold}
        typografi={ETypografiTyper.BODY_SHORT}
      />
    </GuidePanel>
  );
};

export default Veiledning;
