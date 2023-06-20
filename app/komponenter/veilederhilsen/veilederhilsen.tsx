import { GuidePanel, Heading } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstBlokk/tekstBlokk';
import søkerMock from '~/mock/søkerMock';

interface VeilederHilsenProp {
  innhold: SanityDokument | undefined;
}

const hentSøkerFornavn = () => {
  const søker = søkerMock;
  //her skal vi fetche fra API
  let fornavn: string = søker.visningsnavn.trim();
  try {
    fornavn = fornavn.split(' ')[0];
  } catch (e) {
    fornavn = '!';
  }
  return fornavn;
};

const VeilederHilsen: React.FC<VeilederHilsenProp> = ({
  innhold,
}: VeilederHilsenProp) => {
  const søkerFornavn = hentSøkerFornavn();
  return (
    <GuidePanel poster className={`${css.poster}`}>
      <Heading level="2" size="xlarge" className={`${css.tittelMargin}`}>
        Hei {søkerFornavn}
      </Heading>
      <TekstBlokk tekstblokk={innhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
