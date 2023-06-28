import css from './innholdKonteiner.module.css';

interface IProps {
  children?: React.ReactNode;
}

const InnholdKonteiner: React.FC<IProps> = ({ children }) => {
  return (
    <div className={`${css.fyllSide}`}>
      <div className={`${css.innholdKonteiner}`}>{children}</div>
    </div>
  );
};

export default InnholdKonteiner;
