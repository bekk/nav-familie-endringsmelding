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
        /*  
        i bekreftelseBoksInnhold må det legges opp flettefelt for dato og tid hentet fra backend
        mulig det også bør legges til en metode for å gjøre om dato til en string på riktig format
        nåværende format i send-data-backend: Mottatt dato: 2023-07-11T13:41:28.15382
        vi ønsker Mottatt dato: tt:mm, dd:mm:åå 
        */
        /* flettefelter={tid} */
      />
    </Alert>
  );
};

export default BekreftelseBoks;
