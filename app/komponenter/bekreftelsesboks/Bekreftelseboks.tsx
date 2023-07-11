import { Alert } from '@navikt/ds-react';
import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { formaterDato } from '~/utils/formaterDato';

const BekreftelseBoks = () => {
  const { bekreftelseBoksInnhold } = useTekster(ESanityMappe.KVITTERING);

  //TODO: Dato-string skal byttes ut med dato hentet fra api
  const innsendingsTid = formaterDato('2023-07-06T13:44:00.00000');

  return (
    <Alert variant="success">
      <TekstBlokk
        tekstblokk={bekreftelseBoksInnhold}
        flettefelter={{ innsendtTid: innsendingsTid }}
      />
    </Alert>
  );
};

export default BekreftelseBoks;
