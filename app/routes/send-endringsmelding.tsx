import React from 'react';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanitySteg.SEND_ENDRINGER);

  return (
    <HovedInnhold>
      <TekstBlokk
        tekstblokk={tekster.overskrift}
        typografi={TypografiTyper.StegHeadingH1}
      />
    </HovedInnhold>
  );
}
