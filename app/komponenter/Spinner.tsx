import { Loader } from '@navikt/ds-react';
import css from 'app/routes/_index.module.css';

const Spinner = () => {
  return <Loader size="3xlarge" title="venter..." />;
};

export default Spinner;
