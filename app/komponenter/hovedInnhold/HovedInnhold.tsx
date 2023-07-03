import { useTekster } from '~/hooks/contextHooks';
import Banner from '../banner/Banner';
import css from './hovedInnhold.module.css';
import { ESanityMappe } from '~/typer/felles';

interface Props {
  children?: React.ReactNode;
}

const HovedInnhold: React.FC<Props> = ({ children }) => {
  const { bannerTekst } = useTekster(ESanityMappe.FELLES);
  return (
    <>
      <Banner bannerTekst={bannerTekst} />
      <main className={`${css.innholdKonteiner}`}>{children}</main>
    </>
  );
};

export default HovedInnhold;
