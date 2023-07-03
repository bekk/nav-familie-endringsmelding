import { SanityDokument } from '~/typer/sanity/sanity';
import css from './banner.module.css';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import { Heading } from '@navikt/ds-react';

interface Props {
  bannerTekst: SanityDokument | string;
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
          typografi={TypografiTyper.BannerHeading}
        />
      )}
    </section>
  );
};

export default Banner;
