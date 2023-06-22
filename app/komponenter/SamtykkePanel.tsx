import { Button, ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from './tekstblokk/TekstBlokk';
import { useNavigate } from '@remix-run/react';

interface Props {
  innhold: SanityDokument;
  samtykke: SanityDokument;
  feilmelding: SanityDokument;
}

const SamtykkePanel: React.FC<Props> = ({
  innhold,
  samtykke,
  feilmelding,
}: Props) => {
  const navigate = useNavigate();

  const [samtykkeErBekreftet, settSamtykkeErBekreftet] = useState(false);
  const [feilmeldingAktivert, settFeilmeldingAktivert] = useState(false);

  return (
    <>
      <ConfirmationPanel
        checked={samtykkeErBekreftet}
        label={<TekstBlokk tekstblokk={samtykke} />}
        onChange={() => settSamtykkeErBekreftet(harLest => !harLest)}
        error={
          !samtykkeErBekreftet &&
          feilmeldingAktivert && <TekstBlokk tekstblokk={feilmelding} />
        }
      >
        <TekstBlokk tekstblokk={innhold} />
      </ConfirmationPanel>
      <Button
        variant={samtykkeErBekreftet ? 'primary' : 'secondary'}
        onClick={() =>
          samtykkeErBekreftet
            ? navigate('/send-endringsmelding')
            : settFeilmeldingAktivert(true)
        }
      >
        Start
      </Button>
    </>
  );
};

export default SamtykkePanel;
