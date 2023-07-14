import { Button } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import { useState } from 'react';

import {
  useBekreftetSamtykke,
  useSøker,
  useTekster,
} from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import SamtykkePanel from '~/komponenter/samtykkepanel/SamtykkePanel';
import Spinner from '~/komponenter/Spinner';
import { Språkvelger } from '~/komponenter/språkvelger/språkvelger';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import VeilederPanel from '~/komponenter/veilederpanel/VeilederPanel';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import { hentSøkerFornavn } from '~/utils/hentSøkerInfo';

import css from '../routes/_index.module.css';

export const Forside: React.FC = () => {
  const tekster = useTekster(ESanityMappe.FORSIDE);
  const { knappStart } = useTekster(ESanityMappe.FELLES);
  const søker = useSøker();
  const [erSamtykkeBekreftet] = useBekreftetSamtykke();
  const navigate = useNavigate();

  const [erFeilmeldingAktivert, settErFeilmeldingAktivert] = useState(false);

  const hentBrukerhilsen = (
    <TekstBlokk
      tekstblokk={tekster.brukerHilsen}
      typografi={ETypografiTyper.HEADING_H2}
      flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }}
      dataTestid="hilsenFornavn"
    />
  );

  const håndterSamtykkeEndring = () => {
    settErFeilmeldingAktivert(false);
  };

  const håndterTrykkStart = () => {
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
          <div className={`${css.toppMargin}`} data-testid="forsideTittel">
            <TekstBlokk
              tekstblokk={tekster.tittel}
              typografi={ETypografiTyper.HEADING_H1}
            />
          </div>
          <Språkvelger />

          <VeilederPanel
            innhold={tekster.veilederhilsenInnhold}
            poster={true}
            overskrift={hentBrukerhilsen}
          />
          <SamtykkePanel
            håndterSamtykkeEndring={håndterSamtykkeEndring}
            feilmeldingAktivert={erFeilmeldingAktivert}
          />
          <Button
            variant={erSamtykkeBekreftet ? 'primary' : 'secondary'}
            onClick={håndterTrykkStart}
            data-testid="startKnapp"
          >
            <TekstBlokk tekstblokk={knappStart} />
          </Button>
          <TekstBlokk
            tekstblokk={tekster.linkTilPersonvernerklaering}
            dataTestid="linkPersonvern"
          />
        </>
      )}
    </HovedInnhold>
  );
};

export default Forside;
