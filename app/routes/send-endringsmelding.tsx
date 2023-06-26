import React from 'react';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';

import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import Fritekstfelt from '~/komponenter/Fritekstfelt/Fritekstfelt';

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
      </>
    </InnholdKonteiner>
  );
}
