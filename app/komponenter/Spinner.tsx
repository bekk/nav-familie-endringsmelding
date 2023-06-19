import { Loader } from '@navikt/ds-react';
import css from 'app/routes/_index.module.css';

const Spinner = () => {
  return (
    <div className={css['content-loader']}>
      <Loader size="3xlarge" title="venter..." />
    </div>
  );
};

export default Spinner;
