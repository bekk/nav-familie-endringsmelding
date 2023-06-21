import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { Button } from '@navikt/ds-react';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from './tekstBlokk/tekstBlokk';

interface BekreftelsePanelProp {
  melding: SanityDokument | undefined;
  samtykke: SanityDokument | undefined;
  feilmelding: SanityDokument | undefined;
}

const BekreftelsePanel: React.FC<BekreftelsePanelProp> = ({
  melding,
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
        <TekstBlokk tekstblokk={melding} />
      </ConfirmationPanel>
      <Button variant="secondary" onClick={() => settTrykkVidere(true)}>
        Start
      </Button>
    </div>
  );
};

export default BekreftelsePanel;
