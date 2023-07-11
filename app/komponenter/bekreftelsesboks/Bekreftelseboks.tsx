import { Alert } from '@navikt/ds-react';
import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';
import TekstBlokk from '../tekstblokk/TekstBlokk';

const BekreftelseBoks = () => {
  const { bekreftelseBoksInnhold } = useTekster(ESanityMappe.KVITTERING);

  return (
    <Alert variant="success">
      <TekstBlokk
        tekstblokk={bekreftelseBoksInnhold}
        /* flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }} */
      />
    </Alert>
  );
};

export default BekreftelseBoks;
