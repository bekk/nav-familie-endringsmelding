import { Button } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { hentPathForSteg } from '~/utils/hentPathForSteg';

interface Props {
  kanGåVidere: boolean;
  nesteSteg: ESanitySteg;
  tekstPåKnapp: string;
  knappeTrykkUtenSamtykke: () => void;
}

const VidereKnapp: React.FC<Props> = ({
  kanGåVidere,
  nesteSteg,
  tekstPåKnapp,
  knappeTrykkUtenSamtykke,
}: Props) => {
  const navigate = useNavigate();

  const nestePath = hentPathForSteg(nesteSteg);

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

export default VidereKnapp;
