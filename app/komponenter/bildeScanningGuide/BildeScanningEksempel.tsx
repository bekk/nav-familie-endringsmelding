import { Label } from '@navikt/ds-react';
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
  <div>
    <div className={`${css.bildeKonteiner}`}>{bilde}</div>
    <Label size={'small'} className={`${css.statusTekst}`}>
      <span role="presentation" className={`${css.statusIkonKonteiner}`}>
        <StatusIkon status={status} />
      </span>
      {statusTekst}
    </Label>
    <div className={`${css.beskrivelse}`}>{beskrivelse}</div>
  </div>
);

export default BildeScanningEksempel;
