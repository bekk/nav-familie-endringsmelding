import Banner from '../banner/Banner';
import css from './hovedInnhold.module.css';

interface Props {
  children?: React.ReactNode;
}

const HovedInnhold: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Banner />
      <main className={`${css.innholdKonteiner}`}>{children}</main>
    </>
  );
};

export default HovedInnhold;
