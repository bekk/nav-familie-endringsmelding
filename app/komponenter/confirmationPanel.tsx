import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';

const BekreftelsePanel = () => {
  const [read, setread] = useState(false);
  return (
    <ConfirmationPanel
      checked={read}
      label="Ja, jeg samtykker."
      onChange={() => setread(x => !x)}
    >
      For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
      om deg.
    </ConfirmationPanel>
  );
};

export default BekreftelsePanel;
