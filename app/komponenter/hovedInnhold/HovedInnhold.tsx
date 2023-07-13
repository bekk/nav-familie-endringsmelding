import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';

import Banner from '../banner/Banner';
import css from './hovedInnhold.module.css';

interface Props {
  children?: React.ReactNode;
}

const HovedInnhold: React.FC<Props> = ({ children }) => {
  const { bannerTekst } = useTekster(ESanityMappe.FELLES);
  return (
    <>
      <Banner tekst={bannerTekst} />
      <main className={`${css.innholdKonteiner}`}>{children}</main>
    </>
  );
};

export default HovedInnhold;
