import { useTekster } from '~/hooks/contextHooks';
import Banner from '../banner/Banner';
import css from './hovedInnhold.module.css';
import { ESanitySteg } from '~/typer/sanity/sanity';

interface Props {
  children?: React.ReactNode;
}

const HovedInnhold: React.FC<Props> = ({ children }) => {
  const { bannerTekst } = useTekster(ESanitySteg.FELLES);
  return (
    <>
      <Banner bannerTekst={bannerTekst} />
      <main className={`${css.innholdKonteiner}`}>{children}</main>
    </>
  );
};

export default HovedInnhold;
