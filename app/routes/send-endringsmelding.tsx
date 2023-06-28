import React from 'react';
import { useTekster } from '~/hooks/contextHooks';

import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ETypografiTyper } from '~/typer/typografi';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import css from './send-endringsmelding.module.css';
import { useNavigate } from '@remix-run/react';
import { Button } from '@navikt/ds-react';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import Veiledning from '~/komponenter/veiledning/Veiledning';
import { ESteg } from '~/typer/common';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESteg.SEND_ENDRINGER);
  const navigate = useNavigate();
  return (
    <InnholdKonteiner>
      <StegIndikator nåværendeSteg={1} />

      <TekstBlokk
        tekstblokk={tekster.overskrift}
        typografi={ETypografiTyper.StegHeadingH1}
      />
      <Veiledning hilsen={tekster.veilederInnhold} />
      <div className={`${css.navigeringsKnapper}`}>
        <Button
          variant={'primary'}
          onClick={() => navigate(hentPathForSteg(ESteg.FORSIDE))}
        >
          Tilbake
        </Button>
        <Button variant={'secondary'}>Gå videre</Button>
      </div>
    </InnholdKonteiner>
  );
}
