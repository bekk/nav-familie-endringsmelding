import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';

const Veiledning: React.FC = () => {
  const { veilederInnhold } = useTekster(ESanitySteg.SEND_ENDRINGER);

  return (
    <GuidePanel>
      <TekstBlokk
        tekstblokk={veilederInnhold}
        typografi={TypografiTyper.BodyShort}
      />
    </GuidePanel>
  );
};

export default Veiledning;
