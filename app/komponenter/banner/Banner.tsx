import { ESanitySteg } from '~/typer/sanity/sanity';
import css from './banner.module.css';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';

const Banner: React.FC = () => {
  const sanityTekster = useTekster();
  const { bannerTekst } = sanityTekster[ESanitySteg.FELLES];

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
