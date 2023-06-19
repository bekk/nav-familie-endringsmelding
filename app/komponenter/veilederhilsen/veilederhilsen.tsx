import { GuidePanel, Heading } from '@navikt/ds-react';

import css from './veilederhilsen.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstBlokk/tekstBlokk';
import { TypografiTyper } from '~/typer/typografi';

interface VeilederHilsenProp {
  punktlisteDokument: SanityDokument | undefined;
  tittelPunktlisteDokument: SanityDokument | undefined;
  spraak: string;
}

const VeilederHilsen: React.FC<VeilederHilsenProp> = ({
  punktlisteDokument,
  tittelPunktlisteDokument,
  spraak,
}: VeilederHilsenProp) => {
  return (
    <GuidePanel poster className={`${css.poster}`}>
      <Heading level="2" size="xlarge" className={`${css.tittelMargin}`}>
        Hei [fornavn]
      </Heading>
      <TekstBlokk
        tekstblokk={tittelPunktlisteDokument}
        valgBlock={spraak}
        typografi={TypografiTyper.Normal}
      />
      <ul className={`${css.liste}`}>
        <TekstBlokk
          tekstblokk={punktlisteDokument}
          valgBlock={spraak}
          typografi={TypografiTyper.Liste}
        />
      </ul>
    </GuidePanel>
  );
};

export default VeilederHilsen;
