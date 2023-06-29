import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { ISanityDokument } from '~/typer/sanity/sanity';
import { ETypografiTyper } from '~/typer/typografi';

interface Props {
  hilsen: ISanityDokument;
}

const Veiledning: React.FC<Props> = ({ hilsen }: Props) => {
  return (
    <GuidePanel>
      <TekstBlokk tekstblokk={hilsen} typografi={ETypografiTyper.BodyShort} />
    </GuidePanel>
  );
};

export default Veiledning;
