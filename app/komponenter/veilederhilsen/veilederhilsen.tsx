import { GuidePanel, Heading } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstBlokk/tekstBlokk';

interface VeilederHilsenProp {
  innhold: SanityDokument | undefined;
}

const VeilederHilsen: React.FC<VeilederHilsenProp> = ({
  innhold,
}: VeilederHilsenProp) => {
  return (
    <GuidePanel poster className={`${css.poster}`}>
      <Heading level="2" size="xlarge" className={`${css.tittelMargin}`}>
        Hei [fornavn]
      </Heading>
      <TekstBlokk tekstblokk={innhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
