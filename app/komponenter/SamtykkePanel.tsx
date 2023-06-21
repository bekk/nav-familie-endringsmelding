import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { Button } from '@navikt/ds-react';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from './tekstBlokk/tekstBlokk';

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
  const [samtykkeErBekreftet, settSamtykkeErBekreftet] = useState(false);
  const [trykkVidere, settTrykkVidere] = useState(false);

  return (
    <div>
      <ConfirmationPanel
        checked={samtykkeErBekreftet}
        label={<TekstBlokk tekstblokk={samtykke} />}
        onChange={() => settSamtykkeErBekreftet(harLest => !harLest)}
        error={
          !samtykkeErBekreftet &&
          trykkVidere && <TekstBlokk tekstblokk={feilmelding} />
        }
      >
        <TekstBlokk tekstblokk={innhold} />
      </ConfirmationPanel>
      <Button variant="secondary" onClick={() => settTrykkVidere(true)}>
        Start
      </Button>
    </div>
  );
};

export default SamtykkePanel;
