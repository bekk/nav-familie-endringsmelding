import React from 'react';
import { useTekster } from '~/hooks/contextHooks';
import { ESanitySteg } from '~/typer/sanity/sanity';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import css from './send-endringsmelding.module.css';
import { useNavigate } from '@remix-run/react';
import { Button } from '@navikt/ds-react';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import Veiledning from '~/komponenter/veiledning/Veiledning';

export default function SendEndringsmelding() {
  const sanityTekster = useTekster();
  const tekster = sanityTekster[ESanitySteg.SEND_ENDRINGER];
  const navigate = useNavigate();

  return (
    <InnholdKonteiner>
      <StegIndikator nåværendeSteg={1} />

      <TekstBlokk
        tekstblokk={tekster.overskrift}
        typografi={TypografiTyper.StegHeadingH1}
      />
      <Veiledning hilsen={tekster.veilederInnhold} />
      <div className={`${css.navigeringsKnapper}`}>
        <Button
          variant={'primary'}
          onClick={() => navigate(hentPathForSteg(ESanitySteg.FORSIDE))}
        >
          Tilbake
        </Button>
        <Button variant={'secondary'}>Gå videre</Button>
      </div>
    </InnholdKonteiner>
  );
}
