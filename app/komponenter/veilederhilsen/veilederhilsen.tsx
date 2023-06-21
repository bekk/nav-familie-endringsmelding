import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstBlokk/tekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import { useFornavn } from '~/hooks/contextHooks';

interface VeilederHilsenProp {
  innhold: SanityDokument | undefined;
  hilsen: SanityDokument | undefined;
}

const VeilederHilsen: React.FC<VeilederHilsenProp> = ({
  innhold,
  hilsen,
}: VeilederHilsenProp) => {
  const fornavn = useFornavn();

  return (
    <GuidePanel poster className={`${css.poster}`}>
      <TekstBlokk
        tekstblokk={hilsen}
        typografi={TypografiTyper.StegHeadingH2}
        flettefeltInnhold={fornavn}
      />
      <TekstBlokk tekstblokk={innhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
