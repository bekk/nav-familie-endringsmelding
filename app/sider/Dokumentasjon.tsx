import { Alert, Button } from '@navikt/ds-react';
import { useActionData, useNavigate, useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';

import {
  useEndringsmelding,
  useEndringsmeldingMottattDato,
  useTekster,
  useYtelse,
} from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { action as actionBA } from '~/routes/ba.dokumentasjon';
import { action as actionKS } from '~/routes/ks.dokumentasjon';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { EFritekstFeil, fritekstFeilTilApiKeys } from '~/typer/fritekstfeil';
import { EStatusKode, IPostResponse } from '~/typer/response';
import { EYtelse } from '~/typer/ytelse';
import { hentPathForSteg } from '~/utils/hentPath';

import css from './dokumentasjon.module.css';

export default function DokumentasjonSide() {
  const ytelse = useYtelse();
  const teksterFelles = useTekster(ESanityMappe.FELLES);
  const tekster = useTekster(ESanityMappe.SEND_ENDRINGER);
  const [endringsmelding] = useEndringsmelding();
  const [, settEndringsmeldingMottattDato] = useEndringsmeldingMottattDato();

  const navigate = useNavigate();
  const submit = useSubmit();

  const action = ytelse === EYtelse.BARNETRYGD ? actionBA : actionKS;
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
      <h1>Dokumentasjonsopplastning her</h1>
      {feilKode && (
        <Alert variant="error" className={`${css.toppMargin}`}>
          <TekstBlokk tekstblokk={tekster[fritekstFeilTilApiKeys[feilKode]]} />
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
