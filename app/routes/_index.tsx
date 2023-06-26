import type { V2_MetaFunction } from '@remix-run/node';
import css from './_index.module.css';
import Spinner from '~/komponenter/Spinner';
import VeilederHilsen from '~/komponenter/veilederhilsen/VeilederHilsen';
import { ESanitySteg } from '~/typer/sanity/sanity';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import SamtykkePanel from '~/komponenter/samtykkepanel/SamtykkePanel';
import { useTekster } from '~/hooks/contextHooks';
import { Språkvelger } from '~/komponenter/språkvelger/språkvelger';
import { useState } from 'react';
import StartKnapp from '~/komponenter/StartKnapp';

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
  const [samtykkeErBekreftet, settSamtykkeErBekreftet] = useState(false);
  const [feilmeldingAktivert, settFeilmeldingAktivert] = useState(false);

  const håndtereSamtykkeEndring = (bekreftet: boolean) => {
    settSamtykkeErBekreftet(bekreftet);
    settFeilmeldingAktivert(false);
  };

  const håndtereKnappeTrykk = () => {
    settFeilmeldingAktivert(true);
  };

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
            <Språkvelger />
            <VeilederHilsen
              innhold={tekster.veilederhilsenInnhold}
              hilsen={tekster.brukerHilsen}
            />
            <SamtykkePanel
              tittel={tekster.samtykkePanelTittel}
              innhold={tekster.samtykkePanelMelding}
              samtykke={tekster.samtykkePanelSamtykke}
              feilmelding={tekster.samtykkePanelFeilmelding}
              onSamtykkeEndring={håndtereSamtykkeEndring}
              feilmeldingAktivert={feilmeldingAktivert}
            />
            <StartKnapp
              tekstPåKnapp="Start"
              kanGåVidere={samtykkeErBekreftet}
              nesteSteg="/send-endringsmelding"
              knappeTrykkUtenSamtykke={håndtereKnappeTrykk}
            />
            <div className={`${css.personvernerklaeringLink}`}>
              <TekstBlokk tekstblokk={tekster.linkTilPersonvernerklaering} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
