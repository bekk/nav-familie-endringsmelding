import Banner from '../banner/Banner';
import css from './hovedInnhold.module.css';

interface Props {
  children?: React.ReactNode;
}

const HovedInnhold: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Banner />
      <div className={`${css.fyllSide}`}>
        <main className={`${css.innholdKonteiner}`}>{children}</main>
      </div>
    </>
  );
};

export default HovedInnhold;