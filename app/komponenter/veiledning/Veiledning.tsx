import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';
import css from './veiledning.module.css';

const Veiledning: React.FC = () => {
  const { veilederInnhold } = useTekster(ESanitySteg.SEND_ENDRINGER);

  return (
    <GuidePanel className={`${css.veilederPanel}`}>
      <TekstBlokk
        tekstblokk={veilederInnhold}
        typografi={TypografiTyper.BodyShort}
      />
    </GuidePanel>
  );
};

export default Veiledning;
