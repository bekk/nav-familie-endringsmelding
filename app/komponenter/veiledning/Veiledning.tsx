import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { SanityDokument } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';

interface Props {
  hilsen: SanityDokument | undefined;
}

const Veiledning: React.FC<Props> = ({ hilsen }: Props) => {
  return (
    <GuidePanel>
      <TekstBlokk tekstblokk={hilsen} typografi={TypografiTyper.BodyShort} />
    </GuidePanel>
  );
};

export default Veiledning;
