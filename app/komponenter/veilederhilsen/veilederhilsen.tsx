import { GuidePanel, Heading } from '@navikt/ds-react';

import css from './veilederhilsen.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstBlokk/tekstBlokk';
import { TypografiTyper } from '~/typer/typografi';

interface VeilederHilsenProp {
  dokument: SanityDokument | undefined;
}

const VeilederHilsen: React.FC<VeilederHilsenProp> = ({
  dokument,
}: VeilederHilsenProp) => {
  return (
    <GuidePanel poster className={`${css.poster}`}>
      <Heading level="2" size="xlarge" className={`${css.tittelMargin}`}>
        Hei [fornavn]
      </Heading>
      Du må melde fra til oss hvis:
      <ul className={`${css.liste}`}>
        <TekstBlokk
          tekstblokk={dokument}
          valgBlock="en"
          typografi={TypografiTyper.Liste}
        />
      </ul>
    </GuidePanel>
  );
};

export default VeilederHilsen;
