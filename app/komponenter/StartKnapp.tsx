import { Button } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';

interface Props {
  kanGåVidere: boolean;
  nesteSteg: string;
  tekstPåKnapp: string;
  knappeTrykkUtenSamtykke: () => void;
  /*   nåværendeSteg: ESanitySteg; */
  /*  nesteSteg: ESanitySteg; */
}

const StartKnapp: React.FC<Props> = ({
  kanGåVidere,
  nesteSteg,
  tekstPåKnapp,
  knappeTrykkUtenSamtykke,
}: Props) => {
  const navigate = useNavigate();
  const nestePath = nesteSteg; //midlertidig. Bør bruke Steg
  /*  console.log('steg i knapp:', ESanitySteg); 
  
  fra ks-soknad: https://github.com/navikt/familie-ks-soknad/blob/69e40d535d9dfb8f80c10b1c0e693f1329397d29/src/frontend/components/SøknadsSteg/Forside/useBekreftelseOgStartSoknad.tsx#L26
   const nesteRoute: ISteg = hentNesteSteg();
    const nåværendeStegIndex = hentNåværendeStegIndex();
   */

  return (
    <Button
      variant={kanGåVidere ? 'primary' : 'secondary'}
      onClick={
        kanGåVidere ? () => navigate(nestePath) : knappeTrykkUtenSamtykke
      }
    >
      {tekstPåKnapp}
    </Button>
  );
};

export default StartKnapp;
