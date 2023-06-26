import { Button } from '@navikt/ds-react';

interface Props {
  samtykkeErBekreftet: boolean;
}

const StartKnapp: React.FC<Props> = ({ samtykkeErBekreftet }: Props) => {
  /*   const navigate = useNavigate();
  const [feilmeldingAktivert, settFeilmeldingAktivert] = useState(false); */

  return (
    <Button
    /*       variant={samtykkeErBekreftet ? 'primary' : 'secondary'}
      onClick={() =>
        samtykkeErBekreftet
          ? navigate('/send-endringsmelding')
          : settFeilmeldingAktivert(true)
      } */
    >
      Start
    </Button>
  );
};

export default StartKnapp;
