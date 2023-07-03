import type { V2_MetaFunction } from '@remix-run/node';
import css from './_index.module.css';
import Spinner from '~/komponenter/Spinner';
import VeilederHilsen from '~/komponenter/veilederhilsen/VeilederHilsen';
import { ESanitySteg } from '~/typer/sanity/sanity';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import { Språkvelger } from '~/komponenter/språkvelger/språkvelger';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import { useTekster } from '~/hooks/contextHooks';
import { useState } from 'react';
import { Button } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import SamtykkePanel from '~/komponenter/samtykkepanel/SamtykkePanel';

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
  const { knappStart } = useTekster(ESanitySteg.FELLES);

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
    <HovedInnhold>
      {!tekster ? (
        <Spinner />
      ) : (
        <>
          <div className={`${css.toppMargin}`}>
            <TekstBlokk
              tekstblokk={tekster.tittel}
              typografi={TypografiTyper.HeadingH1}
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
            onClick={
              erSamtykkeBekreftet
                ? () => navigate(nestePath)
                : håndterKnappeTrykk
            }
          >
            <TekstBlokk tekstblokk={knappStart} />
          </Button>
          <TekstBlokk tekstblokk={tekster.linkTilPersonvernerklaering} />
        </>
      )}
    </HovedInnhold>
  );
}
