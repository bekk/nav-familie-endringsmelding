import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import React, { useEffect, useState } from 'react';
import {
  useEndringsmeldingMottattDato,
  useSpråk,
  useTekster,
} from '~/hooks/contextHooks';
import { Button, Textarea } from '@navikt/ds-react';
import { Form, useActionData, useNavigate, useSubmit } from '@remix-run/react';
import Veiledning from '~/komponenter/veiledning/Veiledning';
import css from './send-endringsmelding.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import { sendEndringsmelding } from '~/utils/sendEndringsmelding';
import { ActionArgs } from '@remix-run/node';
import { EFritekstFeil } from '~/typer/fritekstfeil';
import {
  MAKS_INPUT_LENGDE,
  RESPONSE_STATUS_OK,
  SPESIAL_TEGN_REGEX,
} from '~/konstanter/sendEndringsmelding';
import { getSession } from '~/sessions';
import { i18nInnhold } from '~/utils/i18n';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const endringsmelding = formData.get('endringsmelding') as string;
  return await sendEndringsmelding(
    endringsmelding,
    await getSession(request.headers.get('Cookie')),
  ).then(response => {
    if (!response.ok) {
      console.log('Feil i send endringsmelding');
      throw Error('Det skjedde en feil under POST til backend');
    }
    return response;
  });
}

export default function SendEndringsmelding() {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  const tekster = useTekster(ESanityMappe.SEND_ENDRINGER);
  const teksterFelles = useTekster(ESanityMappe.FELLES);
  const navigate = useNavigate();
  const [språk] = useSpråk();
  const [, settEndringsmeldingMottattDato] = useEndringsmeldingMottattDato();

  const [valideringsfeil, settValideringsfeil] = useState<EFritekstFeil | null>(
    EFritekstFeil.MANGLER_TEKST,
  );
  const [erKnappTrykketPå, settKnappTrykketPå] = useState<boolean>(false);

  const fritekstfeltFeilmeldinger = {
    [EFritekstFeil.MANGLER_TEKST]: tekster.fritekstfeltFeilmeldingManglerTekst,
    [EFritekstFeil.HAR_SPESIAL_TEGN]:
      tekster.fritekstfeltFeilmeldingSpesialTegn,
    [EFritekstFeil.MINDRE_ENN_TI_TEGN]: tekster.fritekstfeltFeilmeldingMinTegn,
  };

  useEffect(() => {
    if (actionData && actionData.text === RESPONSE_STATUS_OK) {
      settEndringsmeldingMottattDato(actionData.mottattDato);
      navigate(hentPathForSteg(ESteg.KVITTERING));
    }
  }, [actionData, navigate, settEndringsmeldingMottattDato]);

  function validerTekst(endringsmelding: string) {
    if (endringsmelding.length === 0) {
      settValideringsfeil(EFritekstFeil.MANGLER_TEKST);
      return;
    }
    if (endringsmelding.length < 10) {
      settValideringsfeil(EFritekstFeil.MINDRE_ENN_TI_TEGN);
      return;
    }
    if (endringsmelding.match(SPESIAL_TEGN_REGEX)) {
      settValideringsfeil(EFritekstFeil.HAR_SPESIAL_TEGN);
      return;
    }
    settValideringsfeil(null);
  }

  function håndterFeilmeldinger() {
    return (
      erKnappTrykketPå &&
      valideringsfeil && (
        <TekstBlokk tekstblokk={fritekstfeltFeilmeldinger[valideringsfeil]} />
      )
    );
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
          error={håndterFeilmeldinger()}
          onInput={event => {
            validerTekst(event.currentTarget.value);
          }}
        />
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
              event.preventDefault();
              if (valideringsfeil === null)
                submit(event.currentTarget, { replace: true });
              settKnappTrykketPå(true);
            }}
          >
            <TekstBlokk tekstblokk={teksterFelles.knappSendEndringer} />
          </Button>
        </div>
      </Form>
    </HovedInnhold>
  );
}
