import { Loader } from '@navikt/ds-react';

import css from './spinner.module.css';

interface Props {
  skalSentreres?: boolean;
}

const Spinner = ({ skalSentreres = false }: Props) => {
  return (
    <>
      {skalSentreres ? (
        <div className={`${css.spinnerKonteiner}`}>
          <Loader size="3xlarge" title="venter..." />;
        </div>
      ) : (
        <Loader size="3xlarge" title="venter..." />
      )}
    </>
  );
};

export default Spinner;
