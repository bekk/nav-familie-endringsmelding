import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import React, { useEffect, useState } from 'react';
import {
  useEndringsmeldingMottattDato,
  useSpråk,
  useTekster,
} from '~/hooks/contextHooks';
import { Alert, Button, Textarea } from '@navikt/ds-react';
import { Form, useActionData, useNavigate, useSubmit } from '@remix-run/react';
import Veiledning from '~/komponenter/veiledning/Veiledning';
import css from './send-endringsmelding.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import { sendEndringsmelding } from '~/utils/sendEndringsmelding';
import { ActionArgs } from '@remix-run/node';
import { EFritekstFeil } from '~/typer/fritekstfeil';

import { getSession } from '~/sessions';

import { IPostResponse } from '~/typer/response';
import {
  MAKS_INPUT_LENGDE,
  RESPONSE_STATUS_FEIL,
  RESPONSE_STATUS_OK,
  i18nInnhold,
  validerTekst,
} from '~/utils/fritekstfeltValidering';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const endringsmelding = formData.get('endringsmelding') as string;
  return await sendEndringsmelding(
    endringsmelding,
    await getSession(request.headers.get('Cookie')),
  ).then(response => {
    if (response.ok) return response.json();
    return { text: RESPONSE_STATUS_FEIL };
  });
}

export default function SendEndringsmelding() {
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

  const fritekstfeltFeilmeldinger = {
    [EFritekstFeil.MANGLER_TEKST]: tekster.fritekstfeltFeilmeldingManglerTekst,
    [EFritekstFeil.OVER_MAKS_LENGDE]:
      tekster.fritekstfeltFeilmeldingOverMaksLengde,
    [EFritekstFeil.HAR_SPESIAL_TEGN]:
      tekster.fritekstfeltFeilmeldingSpesialTegn,
    [EFritekstFeil.MINDRE_ENN_TI_TEGN]: tekster.fritekstfeltFeilmeldingMinTegn,
  };

  useEffect(() => {
    if (!actionData) return;
    if (actionData.text === RESPONSE_STATUS_OK && actionData.mottattDato) {
      settEndringsmeldingMottattDato(actionData.mottattDato);
      navigate(hentPathForSteg(ESteg.KVITTERING));
    } else {
      settErResponseOK(false);
    }
  }, [actionData, navigate, settEndringsmeldingMottattDato]);

  function visFeilmeldinger() {
    return (
      erKnappTrykketPå &&
      valideringsfeil && (
        <TekstBlokk tekstblokk={fritekstfeltFeilmeldinger[valideringsfeil]} />
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
    <HovedInnhold>
      <StegIndikator nåværendeSteg={1} />
      <TekstBlokk
        tekstblokk={tekster.overskrift}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
      />
      <Veiledning />
      <Form method="post" className={`${css.fullBredde}`}>
        <Textarea
          name="endringsmelding"
          label={<TekstBlokk tekstblokk={tekster.fritekstfeltTittel} />}
          description={
            <TekstBlokk tekstblokk={tekster.fritekstfeltBeskrivelse} />
          }
          maxLength={MAKS_INPUT_LENGDE}
          i18n={i18nInnhold(språk)}
          error={visFeilmeldinger()}
          onInput={event => {
            settValideringsfeil(validerTekst(event.currentTarget.value));
          }}
        />
        {!erResponseOK && (
          <Alert variant="error" className={`${css.toppMargin}`}>
            {/* burde hentes fra sanity */}
            Noe gikk galt! Prøv igjen om noen minutter.
          </Alert>
        )}
        <div className={`${css.navigeringsKnapper}`}>
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
