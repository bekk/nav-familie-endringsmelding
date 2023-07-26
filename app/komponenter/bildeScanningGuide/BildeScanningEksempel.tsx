import { BodyShort, Label } from '@navikt/ds-react';
import React, { ReactElement } from 'react';

import css from './bildeScanningEksempel.module.css';
import StatusIkon, { StatusIkonStatusKey } from './StatusIkon';

interface Props {
  bilde: React.ReactNode;
  status: StatusIkonStatusKey;
  statusTekst: ReactElement;
  beskrivelse: ReactElement;
}

const BildeScanningEksempel = ({
  bilde,
  status,
  statusTekst,
  beskrivelse,
}: Props) => (
  <div className={`${css.konteiner}`}>
    {bilde}
    <Label size={'small'} className={`${css.statusTekst}`}>
      <StatusIkon status={status} />
      {statusTekst}
    </Label>
    <BodyShort size={'small'} className={`${css.beskrivelse}`}>
      {beskrivelse}
    </BodyShort>
  </div>
);

export default BildeScanningEksempel;
