import React from 'react';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import Fritekstfelt from '~/komponenter/Fritekstfelt/Fritekstfelt';
import VidereKnapp from '~/komponenter/VidereKnapp';
import css from './send-endringsmelding.module.css';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanitySteg.SEND_ENDRINGER);

  return (
    <InnholdKonteiner>
      <>
        <TekstBlokk
          tekstblokk={tekster.overskrift}
          typografi={TypografiTyper.StegHeadingH1}
        />
        <Fritekstfelt
          tittel={tekster.fritekstfeltTittel}
          hjelpetekst={tekster.fritekstfeltHjelpetekst}
          feilmeldingManglerTekst={tekster.fritekstfeltFeilmeldingTekst}
          feilmeldingManglerTegn={tekster.fritekstfeltFeilmeldingTegn}
        />
        <div className={`${css.navigeringsKnapper}`}>
          <VidereKnapp
            kanGåVidere={true} //skal denne alltid være true, eller skal man legge på en state, slik som i index?
            nesteSteg={ESanitySteg.FORSIDE}
            tekstPåKnapp={'Tilbake'}
            //gjorde knappeTrykkUtenSamtykke optional, denne må vi vurdere om vi trenger eller ikke ut ifra om det er noe som må "verifiseres" før en kan navigere videre (slik som på forsiden)
          />
          <VidereKnapp
            kanGåVidere={false}
            nesteSteg={ESanitySteg.FORSIDE}
            tekstPåKnapp={'Gå videre'}
          />
        </div>
      </>
    </InnholdKonteiner>
  );
}
