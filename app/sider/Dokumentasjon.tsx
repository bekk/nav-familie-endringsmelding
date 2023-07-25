import { Button } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';

import { useTekster, useYtelse } from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';
import { hentPathForSteg } from '~/utils/hentPath';

import css from './dokumentasjon.module.css';

export default function DokumentasjonSide() {
  const ytelse = useYtelse();
  const navigate = useNavigate();

  const tekster = useTekster(ESanityMappe.DOKUMENTASJON);
  const teksterFelles = useTekster(ESanityMappe.FELLES);

  function håndterSendDokumentasjon() {
    //TODO: legge til en submit-funksjon, i tillegg til en action. Navigere videre til kvitteringsside med dataen.
  }

  return (
    <HovedInnhold måHaBekreftetSamtykke>
      <StegIndikator nåværendeSteg={2} />
      <TekstBlokk
        tekstblokk={tekster.dokumentasjonOverskrift}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
      />
      <TekstBlokk tekstblokk={tekster.veiledning} />
      <div className={`${css.navigeringsKnappKonteiner}`}>
        <Button
          type="button"
          variant={'secondary'}
          onClick={() =>
            navigate(hentPathForSteg(ytelse, ESteg.SEND_ENDRINGER))
          }
        >
          <TekstBlokk tekstblokk={teksterFelles.knappTilbake} />
        </Button>
        <Button variant={'primary'} onClick={håndterSendDokumentasjon}>
          <TekstBlokk tekstblokk={teksterFelles.knappSendEndringer} />
        </Button>
      </div>
    </HovedInnhold>
  );
}
