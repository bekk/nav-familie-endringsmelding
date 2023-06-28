import type { V2_MetaFunction } from '@remix-run/node';
import css from './_index.module.css';
import Spinner from '~/komponenter/Spinner';
import VeilederHilsen from '~/komponenter/veilederhilsen/VeilederHilsen';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ETypografiTyper } from '~/typer/typografi';
import SamtykkePanel from '~/komponenter/samtykkepanel/SamtykkePanel';
import { useTekster } from '~/hooks/contextHooks';
import { Språkvelger } from '~/komponenter/språkvelger/språkvelger';
import { useState } from 'react';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import { Button } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import { ESteg } from '~/typer/common';

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
  const tekster = useTekster(ESteg.FORSIDE);
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);
  const [erFeilmeldingAktivert, settErFeilmeldingAktivert] = useState(false);

  const navigate = useNavigate();
  const nestePath = hentPathForSteg(ESteg.SEND_ENDRINGER);

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
            typografi={ETypografiTyper.StegHeadingH1}
          />
          <Språkvelger />
          <VeilederHilsen tekster={tekster} />
          <SamtykkePanel
            tekster={tekster}
            håndterSamtykkeEndring={håndterSamtykkeEndring}
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
          <div className={`${css.personvernErklæringLink}`}>
            <TekstBlokk tekstblokk={tekster.linkTilPersonvernerklaering} />
          </div>
        </>
      )}
    </InnholdKonteiner>
  );
}
