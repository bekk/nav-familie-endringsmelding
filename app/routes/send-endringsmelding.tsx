import React from 'react';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import Banner from '~/komponenter/banner/Banner';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanitySteg.SEND_ENDRINGER);

  return (
    <>
      <Banner bannerTekst={tekster.bannerTekst} />
      <InnholdKonteiner>
        <TekstBlokk
          tekstblokk={tekster.overskrift}
          typografi={TypografiTyper.StegHeadingH1}
        />
      </InnholdKonteiner>
    </>
  );
}
