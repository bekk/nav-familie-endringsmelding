import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { Button } from '@navikt/ds-react';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from './tekstBlokk/tekstBlokk';

interface BekreftelsePanelProp {
  melding: SanityDokument | undefined;
  /*  hilsen: SanityDokument | undefined; */
}

const BekreftelsePanel: React.FC<BekreftelsePanelProp> = ({
  melding,
}: BekreftelsePanelProp) => {
  const [lest, settLest] = useState(false);
  const [trykkVidere, settTrykkVidere] = useState(false);

  return (
    <div>
      <ConfirmationPanel
        checked={lest}
        label="Ja, jeg samtykker."
        onChange={() => settLest(x => !x)}
        error={!lest && trykkVidere && 'Du må samtykke før du kan fortsette.'}
      >
        <TekstBlokk tekstblokk={melding} />
        {/*      For å komme videre må du gi oss lov til å hente inn og bruke
        opplysninger om deg. */}
      </ConfirmationPanel>
      <Button variant="secondary" onClick={() => settTrykkVidere(true)}>
        Start
      </Button>
    </div>
  );
};

export default BekreftelsePanel;
