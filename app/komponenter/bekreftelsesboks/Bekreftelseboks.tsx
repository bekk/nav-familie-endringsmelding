import { Alert } from '@navikt/ds-react';
import {
  useEndringsmeldingMottattDato,
  useTekster,
} from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { formaterDato } from '~/utils/formaterDato';

const BekreftelseBoks = () => {
  const { bekreftelseBoksInnhold } = useTekster(ESanityMappe.KVITTERING);
  const [endringsmeldingMottattDato] = useEndringsmeldingMottattDato();

  return (
    <Alert variant="success">
      <TekstBlokk
        tekstblokk={bekreftelseBoksInnhold}
        flettefelter={{ innsendtTid: formaterDato(endringsmeldingMottattDato) }}
      />
    </Alert>
  );
};

export default BekreftelseBoks;
