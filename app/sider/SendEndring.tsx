import { Button, Textarea } from '@navikt/ds-react';
import { useNavigate, useNavigation } from '@remix-run/react';
import React, { useState } from 'react';

import {
  useEndringsmelding,
  useSpråk,
  useTekster,
  useYtelse,
} from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import Spinner from '~/komponenter/spinner/Spinner';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import VeilederPanel from '~/komponenter/veilederpanel/VeilederPanel';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { EFritekstFeil, fritekstFeilTilApiKeys } from '~/typer/fritekstfeil';
import { ETypografiTyper } from '~/typer/typografi';
import {
  i18nInnhold,
  MAKS_INPUT_LENGDE,
  validerTekst,
} from '~/utils/fritekstfeltValidering';
import { hentPathForSteg } from '~/utils/hentPath';

import css from './send-endringsmelding.module.css';

export default function SendEndringSide() {
  const ytelse = useYtelse();
  const tekster = useTekster(ESanityMappe.SEND_ENDRINGER);
  const teksterFelles = useTekster(ESanityMappe.FELLES);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [språk] = useSpråk();
  const [, settEndringsmelding] = useEndringsmelding();
  const [valideringsfeil, settValideringsfeil] = useState<EFritekstFeil | null>(
    EFritekstFeil.MANGLER_TEKST,
  );
  const [erKnappTrykketPå, settKnappTrykketPå] = useState<boolean>(false);

  const [endringsmeldingInput, settEndringsmeldingInput] = useState<string>('');

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

  function håndterTrykkNeste() {
    if (valideringsfeil === null) {
      settEndringsmelding({ tekst: endringsmeldingInput, dokumenter: [] });
      navigate(hentPathForSteg(ytelse, ESteg.DOKUMENTASJON));
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
              settEndringsmeldingInput(event.currentTarget.value);
            }}
          />
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
              data-testid="knappVidereSteg1"
              onClick={håndterTrykkNeste}
            >
              <TekstBlokk tekstblokk={teksterFelles.knappNeste} />
            </Button>
          </div>
        </>
      )}
    </HovedInnhold>
  );
}
