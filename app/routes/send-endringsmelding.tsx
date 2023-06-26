import React from 'react';
import { useTekster } from '~/hooks/contextHooks';
import Veiledning from '~/komponenter/veiledning/Veiledning';
import { ESanitySteg } from '~/typer/sanity/sanity';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanitySteg.SEND_ENDRINGER);

  return (
    <>
      <p>Send Endringsmelding</p>

      <Veiledning hilsen={tekster.veilederInnhold} />
    </>
  );
}
