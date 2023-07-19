import { Alert, Button, Textarea } from '@navikt/ds-react';
import { Form, useActionData, useNavigate, useSubmit } from '@remix-run/react';
import React, { useEffect, useState } from 'react';

import {
  useEndringsmeldingMottattDato,
  useSpråk,
  useTekster,
} from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import VeilederPanel from '~/komponenter/veilederpanel/VeilederPanel';
import { action } from '~/routes/send-endringsmelding';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { EFritekstFeil, fritekstFeilTilApiKeys } from '~/typer/fritekstfeil';
import { IPostResponse, RESPONSE_STATUS_OK } from '~/typer/response';
import { ETypografiTyper } from '~/typer/typografi';
import {
  i18nInnhold,
  MAKS_INPUT_LENGDE,
  validerTekst,
} from '~/utils/fritekstfeltValidering';
import { hentPathForSteg } from '~/utils/hentPath';

import css from './../routes/send-endringsmelding.module.css';

export default function SendEndringSide() {
  const actionData: IPostResponse | undefined = useActionData<typeof action>();
  const submit = useSubmit();

  const tekster = useTekster(ESanityMappe.SEND_ENDRINGER);
  const teksterFelles = useTekster(ESanityMappe.FELLES);
  const navigate = useNavigate();
  const [språk] = useSpråk();
  const [, settEndringsmeldingMottattDato] = useEndringsmeldingMottattDato();

  const [erResponseOK, settErResponseOK] = useState<boolean>(true);
  const [valideringsfeil, settValideringsfeil] = useState<EFritekstFeil | null>(
    EFritekstFeil.MANGLER_TEKST,
  );
  const [erKnappTrykketPå, settKnappTrykketPå] = useState<boolean>(false);

  useEffect(() => {
    if (!actionData) return;

    if (actionData.text === RESPONSE_STATUS_OK && actionData.mottattDato) {
      settEndringsmeldingMottattDato(actionData.mottattDato);
      navigate(hentPathForSteg(ESteg.KVITTERING));
    } else {
      settErResponseOK(false);
    }
  }, [actionData, navigate, settEndringsmeldingMottattDato]);

  function genererFeilmelding() {
    return (
      erKnappTrykketPå &&
      valideringsfeil && (
        <TekstBlokk
          tekstblokk={tekster[fritekstFeilTilApiKeys[valideringsfeil]]}
          typografi={ETypografiTyper.LABEL}
        />
      )
    );
  }

  function håndterSendEndringsmelding(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    if (valideringsfeil === null) {
      settErResponseOK(true);
      submit(event.currentTarget, { replace: true });
    }
    settKnappTrykketPå(true);
  }

  return (
    <HovedInnhold måHaBekreftetSamtykke>
      <StegIndikator nåværendeSteg={1} />
      <TekstBlokk
        tekstblokk={tekster.overskrift}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
        dataTestid="overskriftSteg1"
      />
      <VeilederPanel innhold={tekster.veilederInnhold} />
      <Form method="post" className={`${css.fullBredde}`}>
        <Textarea
          data-testid="fritekstfelt"
          name="endringsmelding"
          label={
            <TekstBlokk
              tekstblokk={tekster.fritekstfeltTittel}
              dataTestid="fritekstfeltTittel"
            />
          }
          description={
            <TekstBlokk tekstblokk={tekster.fritekstfeltBeskrivelse} />
          }
          autoComplete="on"
          maxLength={MAKS_INPUT_LENGDE}
          i18n={i18nInnhold(språk)}
          error={genererFeilmelding()}
          onInput={event => {
            settValideringsfeil(validerTekst(event.currentTarget.value));
          }}
        />
        {!erResponseOK && (
          <Alert variant="error" className={`${css.toppMargin}`}>
            <TekstBlokk
              tekstblokk={tekster.alertFeilUnderSendEndringsmelding}
            />
          </Alert>
        )}
        <div className={`${css.navigeringsKnappKonteiner}`}>
          <Button
            type="button"
            variant={'secondary'}
            onClick={() => navigate(hentPathForSteg(ESteg.FORSIDE))}
          >
            <TekstBlokk tekstblokk={teksterFelles.knappTilbake} />
          </Button>
          <Button
            type="submit"
            variant={valideringsfeil === null ? 'primary' : 'secondary'}
            data-testid="knappVidereSteg1"
            onClick={event => {
              håndterSendEndringsmelding(event);
            }}
          >
            <TekstBlokk tekstblokk={teksterFelles.knappSendEndringer} />
          </Button>
        </div>
      </Form>
    </HovedInnhold>
  );
}
