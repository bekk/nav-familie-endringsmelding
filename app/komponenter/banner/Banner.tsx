import { SanityDokument } from '~/typer/sanity/sanity';
import css from './banner.module.css';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';

interface Props {
  bannerTekst: SanityDokument;
}

const Banner: React.FC<Props> = ({ bannerTekst }: Props) => {
  return (
    <section className={`${css.bannerStil}`}>
      <TekstBlokk
        tekstblokk={bannerTekst}
        typografi={TypografiTyper.BannerHeading}
      />
    </section>
  );
};

export default Banner;
