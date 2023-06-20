import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { Button } from '@navikt/ds-react';

const BekreftelsePanel = () => {
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
        For å komme videre må du gi oss lov til å hente inn og bruke
        opplysninger om deg.
      </ConfirmationPanel>
      <Button variant="secondary" onClick={() => settTrykkVidere(true)}>
        Start
      </Button>
    </div>
  );
};

export default BekreftelsePanel;
