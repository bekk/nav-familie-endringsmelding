import React from 'react';
import { useTekster } from '~/hooks/contextHooks';
import { ESanitySteg } from '~/typer/sanity/sanity';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanitySteg.SEND_ENDRINGER);

  return (
    <InnholdKonteiner>
      <TekstBlokk
        tekstblokk={tekster.overskrift}
        typografi={TypografiTyper.StegHeadingH1}
      />
    </InnholdKonteiner>
  );
}
