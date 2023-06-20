import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstBlokk/tekstBlokk';
import { TypografiTyper } from '~/typer/typografi';

interface VeilederHilsenProp {
  innhold: SanityDokument | undefined;
  hilsen: SanityDokument | undefined;
}

const VeilederHilsen: React.FC<VeilederHilsenProp> = ({
  innhold,
  hilsen,
}: VeilederHilsenProp) => {
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
