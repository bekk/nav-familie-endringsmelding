import { Alert, Button } from '@navikt/ds-react';
import { useActionData, useNavigate, useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';

import {
  useEndringsmelding,
  useEndringsmeldingMottattDato,
  useTekster,
  useYtelse,
} from '~/hooks/contextHooks';
import TaGodtBildeInfo from '~/komponenter/bildeScanningGuide/TaGodtBilde';
import FilopplastningFelt from '~/komponenter/filopplastingfelt/FilopplastningFelt';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { EAction } from '~/typer/action';
import { IEndringsmelding } from '~/typer/endringsmelding';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { IFil, IPostFilResponse } from '~/typer/filopplastning';
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
  const [endringsmelding, settEndringsmelding] = useEndringsmelding();
  const [, settEndringsmeldingMottattDato] = useEndringsmeldingMottattDato();

  const navigate = useNavigate();
  const submit = useSubmit();

  const action = hentAction(ytelse);
  const actionData: IPostResponse | IPostFilResponse | undefined =
    useActionData<typeof action>();

  const [feilKode, settFeilKode] = useState<EFritekstFeil | null>(null);

  useEffect(() => {
    if (!actionData) return;
    if (
      actionData.status === EStatusKode.OK &&
      'data' in actionData &&
      actionData.data
    ) {
      settEndringsmeldingMottattDato(actionData.data.mottattDato);
      navigate(hentPathForSteg(ytelse, ESteg.KVITTERING));
    } else if (
      actionData.status === EStatusKode.OK &&
      'response' in actionData &&
      actionData.response
    ) {
      actionData as IPostFilResponse;
      const fil: IFil = actionData.response;
      const dokumenter = endringsmelding.dokumenter;
      dokumenter.push(fil.dokumentId);
      const nyEndringsmelding: IEndringsmelding = {
        dokumenter: dokumenter,
        tekst: endringsmelding.tekst,
      };
      settEndringsmelding(nyEndringsmelding);
    } else if ('data' in actionData) {
      settFeilKode(actionData.feilKode || null);
    }
  }, [
    actionData,
    navigate,
    settEndringsmeldingMottattDato,
    ytelse,
    settEndringsmelding,
    endringsmelding.dokumenter,
    endringsmelding.tekst,
  ]);

  function håndterSendEndringsmelding() {
    let dokumenterStreng = '';
    endringsmelding.dokumenter.forEach(dok => (dokumenterStreng += dok + ','));
    const formData = new FormData();
    formData.append('tekst', endringsmelding.tekst);
    formData.append('dokumenter', dokumenterStreng);
    formData.append('_action', EAction.SEND_ENDRINGER);

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
      <div>
        <TekstBlokk
          tekstblokk={teksterDokumentasjon.veiledning}
          typografi={ETypografiTyper.BODY_SHORT}
        />
      </div>
      <TaGodtBildeInfo />
      <FilopplastningFelt />
      {feilKode && (
        <Alert variant="error" className={`${css.toppMargin}`}>
          <TekstBlokk
            tekstblokk={teksterSendEndringer[fritekstFeilTilApiKeys[feilKode]]}
          />
        </Alert>
      )}
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
