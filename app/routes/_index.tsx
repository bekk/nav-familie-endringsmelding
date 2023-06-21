import type { V2_MetaFunction } from '@remix-run/node';
import css from './_index.module.css';
import React from 'react';
import Spinner from '~/komponenter/Spinner';
import VeilederHilsen from '../komponenter/veilederhilsen/veilederhilsen';
import { ESanitySteg } from '~/typer/sanity/sanity';
import TekstBlokk from '~/komponenter/tekstBlokk/tekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/utils/sanityLoader';
import BekreftelsePanel from '~/komponenter/confirmationPanel';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Familie endringsmelding' },
    {
      name: 'description',
      content:
        'Endringsmelding for barnetrygd, kontantstøtte og enslig forsørger',
    },
  ];
};

export default function Index() {
  const tekster = useTekster(ESanitySteg.FORSIDE);

  return (
    <div className={`${css.fyllSide}`}>
      <div className={`${css.innholdKonteiner}`}>
        {!tekster ? (
          <Spinner />
        ) : (
          <>
            <TekstBlokk
              tekstblokk={tekster.tittel}
              typografi={TypografiTyper.StegHeadingH1}
            />
            <VeilederHilsen
              innhold={tekster.veilederhilsenInnhold}
              hilsen={tekster.brukerHilsen}
            />
            <BekreftelsePanel
              melding={tekster.bekreftelsesPanelMelding}
              samtykke={tekster.bekreftelsesPanelSamtykke}
              feilmelding={tekster.bekreftelsesPanelFeilmelding}
            />
            <div className={`${css.personvernerklaeringLink}`}>
              <TekstBlokk
                tekstblokk={tekster.linkTilPersonvernerklaering}
              ></TekstBlokk>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
