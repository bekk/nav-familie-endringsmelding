import { Alert, Button, Textarea } from '@navikt/ds-react';
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import React, { useEffect, useState } from 'react';

import {
  useEndringsmeldingMottattDato,
  useSpråk,
  useTekster,
  useYtelse,
} from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import Spinner from '~/komponenter/spinner/Spinner';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import VeilederPanel from '~/komponenter/veilederpanel/VeilederPanel';
import { action as actionBA } from '~/routes/ba.endringsmelding';
import { action as actionKS } from '~/routes/ks.endringsmelding';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { EFritekstFeil, fritekstFeilTilApiKeys } from '~/typer/fritekstfeil';
import { EStatusKode, IPostResponse } from '~/typer/response';
import { ETypografiTyper } from '~/typer/typografi';
import { EYtelse } from '~/typer/ytelse';
import {
  i18nInnhold,
  MAKS_INPUT_LENGDE,
  validerTekst,
} from '~/utils/fritekstfeltValidering';
import { hentPathForSteg } from '~/utils/hentPath';

import css from './send-endringsmelding.module.css';

export default function SendEndringSide() {
  const ytelse = useYtelse();
  const action = ytelse === EYtelse.BARNETRYGD ? actionBA : actionKS;
  const actionData: IPostResponse | undefined = useActionData<typeof action>();
  const submit = useSubmit();

  const tekster = useTekster(ESanityMappe.SEND_ENDRINGER);
  const teksterFelles = useTekster(ESanityMappe.FELLES);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [språk] = useSpråk();
  const [, settEndringsmeldingMottattDato] = useEndringsmeldingMottattDato();

  const [erResponseOK, settErResponseOK] = useState<boolean>(true);
  const [valideringsfeil, settValideringsfeil] = useState<EFritekstFeil | null>(
    EFritekstFeil.MANGLER_TEKST,
  );
  const [erKnappTrykketPå, settKnappTrykketPå] = useState<boolean>(false);

  useEffect(() => {
    if (!actionData) return;

    if (actionData.status === EStatusKode.OK && actionData.data) {
      settEndringsmeldingMottattDato(actionData.data.mottattDato);
      navigate(hentPathForSteg(ytelse, ESteg.KVITTERING));
    } else {
      settErResponseOK(false);
    }
  }, [actionData, navigate, settEndringsmeldingMottattDato, ytelse]);

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
      {navigation.state === 'submitting' || navigation.state === 'loading' ? (
        <Spinner skalSentreres />
      ) : (
        <>
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
                onClick={() => navigate(hentPathForSteg(ytelse, ESteg.FORSIDE))}
              >
                <TekstBlokk tekstblokk={teksterFelles.knappTilbake} />
              </Button>

              <Button
                type="button"
                variant={valideringsfeil === null ? 'primary' : 'secondary'}
                data-testid="knappVidereSteg2"
                onClick={() => navigate(hentPathForSteg(ytelse, ESteg.FORSIDE))} //denne skal bli til dokumentasjonsiden når den siden er laget
              >
                <TekstBlokk tekstblokk={teksterFelles.knappNeste} />
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
        </>
      )}
    </HovedInnhold>
  );
}
