import css from './banner.module.css';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { Heading } from '@navikt/ds-react';
import { ETypografiTyper } from '~/typer/typografi';
import { ISanityDokument } from '~/typer/sanity/sanity';

interface Props {
  bannerTekst: ISanityDokument | string;
}
const Banner: React.FC<Props> = ({ bannerTekst }) => {
  return (
    <section className={`${css.bannerStil}`}>
      {typeof bannerTekst == 'string' ? (
        <Heading level="1" size="large">
          {bannerTekst}
        </Heading>
      ) : (
        <TekstBlokk
          tekstblokk={bannerTekst}
          typografi={ETypografiTyper.BANNER_HEADING}
        />
      )}
    </section>
  );
};

export default Banner;
