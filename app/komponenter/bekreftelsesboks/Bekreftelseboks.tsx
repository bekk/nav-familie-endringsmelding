import { Alert } from '@navikt/ds-react';

import {
  useEndringsmeldingMottattDato,
  useTekster,
} from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';
import { formaterDato } from '~/utils/formaterDato';

import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './bekreftelsesboks.module.css';

const BekreftelseBoks = () => {
  const { bekreftelseBoksInnhold } = useTekster(ESanityMappe.KVITTERING);
  const [endringsmeldingMottattDato] = useEndringsmeldingMottattDato();

  return (
    <Alert variant="success" className={`${css.fullBredde}`}>
      <TekstBlokk
        tekstblokk={bekreftelseBoksInnhold}
        flettefelter={{ mottattDato: formaterDato(endringsmeldingMottattDato) }}
      />
    </Alert>
  );
};

export default BekreftelseBoks;
