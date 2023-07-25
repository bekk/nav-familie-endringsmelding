import { Alert, Button } from '@navikt/ds-react';
import { useActionData, useNavigate, useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';

import {
  useEndringsmelding,
  useEndringsmeldingMottattDato,
  useTekster,
  useYtelse,
} from '~/hooks/contextHooks';
import FilopplastningFelt from '~/komponenter/filopplastingfelt/FilopplastningFelt';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { EFritekstFeil, fritekstFeilTilApiKeys } from '~/typer/fritekstfeil';
import { EStatusKode, IPostResponse } from '~/typer/response';
import { ETypografiTyper } from '~/typer/typografi';
import { hentAction } from '~/utils/hentAction';
import { hentPathForSteg } from '~/utils/hentPath';

import css from './dokumentasjon.module.css';

export default function DokumentasjonSide() {
  const ytelse = useYtelse();
  const teksterDokumentasjon = useTekster(ESanityMappe.DOKUMENTASJON);
  const teksterFelles = useTekster(ESanityMappe.FELLES);
  const teksterSendEndringer = useTekster(ESanityMappe.SEND_ENDRINGER);
  const [endringsmelding] = useEndringsmelding();
  const [, settEndringsmeldingMottattDato] = useEndringsmeldingMottattDato();

  const navigate = useNavigate();
  const submit = useSubmit();

  const action = hentAction(ytelse);
  const actionData: IPostResponse | undefined = useActionData<typeof action>();

  const [feilKode, settFeilKode] = useState<EFritekstFeil | null>(null);

  useEffect(() => {
    if (!actionData) return;

    if (actionData.status === EStatusKode.OK && actionData.data) {
      settEndringsmeldingMottattDato(actionData.data.mottattDato);
      navigate(hentPathForSteg(ytelse, ESteg.KVITTERING));
    } else {
      settFeilKode(actionData.feilKode || null);
    }
  }, [actionData, navigate, settEndringsmeldingMottattDato, ytelse]);

  function håndterSendEndringsmelding() {
    const formData = new FormData();
    formData.append('endringsmelding', endringsmelding.tekst);
    submit(formData, {
      method: 'post',
      action: hentPathForSteg(ytelse, ESteg.DOKUMENTASJON),
    });
  }

  return (
    <HovedInnhold måHaBekreftetSamtykke>
      <StegIndikator nåværendeSteg={2} />

      <TekstBlokk
        tekstblokk={teksterDokumentasjon.dokumentasjonOverskrift}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
      />
      {feilKode && (
        <Alert variant="error" className={`${css.toppMargin}`}>
          <TekstBlokk
            tekstblokk={teksterSendEndringer[fritekstFeilTilApiKeys[feilKode]]}
          />
        </Alert>
      )}

      <div>
        <TekstBlokk
          tekstblokk={teksterDokumentasjon.veiledning}
          typografi={ETypografiTyper.BODY_SHORT}
        />
      </div>
      <FilopplastningFelt />
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

        <Button
          type="submit"
          variant={'primary'}
          onClick={håndterSendEndringsmelding}
        >
          <TekstBlokk tekstblokk={teksterFelles.knappSendEndringer} />
        </Button>
      </div>
    </HovedInnhold>
  );
}
