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
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import { Button } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import { hentPathForSteg } from '~/utils/hentPathForSteg';

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
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);
  const [erFeilmeldingAktivert, settErFeilmeldingAktivert] = useState(false);

  const navigate = useNavigate();
  const nestePath = hentPathForSteg(ESanitySteg.SEND_ENDRINGER);

  const håndterSamtykkeEndring = (bekreftet: boolean) => {
    settErSamtykkeBekreftet(bekreftet);
    settErFeilmeldingAktivert(false);
  };

  const håndterKnappeTrykk = () => {
    settErFeilmeldingAktivert(true);
  };

  return (
    <InnholdKonteiner>
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
            onSamtykkeEndring={håndterSamtykkeEndring}
            feilmeldingAktivert={erFeilmeldingAktivert}
          />
          <Button
            variant={erSamtykkeBekreftet ? 'primary' : 'secondary'}
            onClick={
              erSamtykkeBekreftet
                ? () => navigate(nestePath)
                : håndterKnappeTrykk
            }
          >
            Start
          </Button>
          <div className={`${css.personvernerklæringLink}`}>
            <TekstBlokk tekstblokk={tekster.linkTilPersonvernerklaering} />
          </div>
        </>
      )}
    </InnholdKonteiner>
  );
}
