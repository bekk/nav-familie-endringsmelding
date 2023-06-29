import css from './innholdKonteiner.module.css';

interface Props {
  children?: React.ReactNode;
}

const InnholdKonteiner: React.FC<Props> = ({ children }) => {
  return (
    <div className={`${css.fyllSide}`}>
      <div className={`${css.innholdKonteiner}`}>{children}</div>
    </div>
  );
};

export default InnholdKonteiner;
