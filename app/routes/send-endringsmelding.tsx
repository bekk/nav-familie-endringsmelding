import React from 'react';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import css from './send-endringsmelding.module.css';
import { useTekster } from '~/utils/sanityLoader';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanitySteg.SEND_ENDRINGER);

  return (
    <div className={`${css.fyllSide}`}>
      <div className={`${css.innholdKonteiner}`}>
        <TekstBlokk
          tekstblokk={tekster.overskrift}
          typografi={TypografiTyper.StegHeadingH1}
        />
      </div>
    </div>
  );
}
