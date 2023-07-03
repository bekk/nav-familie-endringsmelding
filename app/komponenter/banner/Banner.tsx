import css from './banner.module.css';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { ETypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';

const Banner: React.FC = () => {
  const { bannerTekst } = useTekster(ESanityMappe.FELLES);

  return (
    <section className={`${css.bannerStil}`}>
      <TekstBlokk
        tekstblokk={bannerTekst}
        typografi={ETypografiTyper.BANNER_HEADING}
      />
    </section>
  );
};

export default Banner;
