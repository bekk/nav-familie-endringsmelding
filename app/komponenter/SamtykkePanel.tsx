import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { Button } from '@navikt/ds-react';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from './tekstBlokk/tekstBlokk';

interface BekreftelsePanelProp {
  innhold: SanityDokument;
  samtykke: SanityDokument;
  feilmelding: SanityDokument;
}

const SamtykkePanel: React.FC<BekreftelsePanelProp> = ({
  innhold,
  samtykke,
  feilmelding,
}: BekreftelsePanelProp) => {
  const [lest, settLest] = useState(false);
  const [trykkVidere, settTrykkVidere] = useState(false);

  return (
    <div>
      <ConfirmationPanel
        checked={lest}
        label={<TekstBlokk tekstblokk={samtykke} />}
        onChange={() => settLest(x => !x)}
        error={!lest && trykkVidere && <TekstBlokk tekstblokk={feilmelding} />}
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
