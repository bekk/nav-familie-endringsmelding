import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';

interface Props {
  innhold: SanityDokument | undefined;
  hilsen: SanityDokument | undefined;
}

const VeilederHilsen: React.FC<Props> = ({ innhold, hilsen }: Props) => {
  return (
    <GuidePanel poster className={`${css.poster}`}>
      <TekstBlokk
        tekstblokk={hilsen}
        typografi={TypografiTyper.StegHeadingH2}
      />
      <TekstBlokk tekstblokk={innhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
