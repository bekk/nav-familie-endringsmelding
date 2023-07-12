import type { V2_MetaFunction } from '@remix-run/node';
import css from './_index.module.css';
import Spinner from '~/komponenter/Spinner';
import VeilederHilsen from '~/komponenter/veilederhilsen/VeilederHilsen';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import { Button } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { useBekreftetSamtykke, useTekster } from '~/hooks/contextHooks';
import SamtykkePanel from '~/komponenter/samtykkepanel/SamtykkePanel';
import { Språkvelger } from '~/komponenter/språkvelger/språkvelger';
import { ESteg, ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';
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
  const [erSamtykkeBekreftet] = useBekreftetSamtykke();
  const tekster = useTekster(ESanityMappe.FORSIDE);
  const { knappStart } = useTekster(ESanityMappe.FELLES);

  const [erFeilmeldingAktivert, settErFeilmeldingAktivert] = useState(false);

  const navigate = useNavigate();

  const håndterSamtykkeEndring = () => {
    settErFeilmeldingAktivert(false);
  };

  const håndterKnappeTrykk = () => {
    if (erSamtykkeBekreftet) {
      navigate(hentPathForSteg(ESteg.SEND_ENDRINGER));
    } else {
      settErFeilmeldingAktivert(true);
    }
  };

  return (
    <HovedInnhold>
      {!tekster ? (
        <Spinner />
      ) : (
        <>
          <div className={`${css.toppMargin}`}>
            <TekstBlokk
              tekstblokk={tekster.tittel}
              typografi={ETypografiTyper.HEADING_H1}
            />
          </div>
          <Språkvelger />
          <VeilederHilsen />
          <SamtykkePanel
            håndterSamtykkeEndring={håndterSamtykkeEndring}
            feilmeldingAktivert={erFeilmeldingAktivert}
          />
          <Button
            variant={erSamtykkeBekreftet ? 'primary' : 'secondary'}
            onClick={håndterKnappeTrykk}
          >
            <TekstBlokk tekstblokk={knappStart} />
          </Button>
          <TekstBlokk tekstblokk={tekster.linkTilPersonvernerklaering} />
        </>
      )}
    </HovedInnhold>
  );
}
