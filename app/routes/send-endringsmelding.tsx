import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import React, { useEffect, useState } from 'react';
import { useSpråk, useTekster } from '~/hooks/contextHooks';
import { Button, Textarea } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import Veiledning from '~/komponenter/veiledning/Veiledning';
import css from './send-endringsmelding.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import { sendEndringsmelding } from '~/utils/sendEndringsmelding';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanityMappe.SEND_ENDRINGER);
  const teksterFelles = useTekster(ESanityMappe.FELLES);

  const navigate = useNavigate();
  const [språk] = useSpråk();

  const spesialTegnRegex = /[!@#$%^&*()?"{}|<>+¨=]/;
  const MAKS_INPUT_LENGDE = 1000;

  const i18nInnhold = {
    counterTooMuch: hentI18nInnhold(true),
    counterLeft: hentI18nInnhold(false),
  };

  function hentI18nInnhold(tegnIgjen: boolean) {
    switch (språk) {
      case 'nb':
        return tegnIgjen ? 'tegn igjen' : 'tegn for mye';
      case 'nn':
        return tegnIgjen ? 'teikn igjen' : 'teikn for mykje';
      case 'en':
        return tegnIgjen ? 'characters left' : 'characters too many';
    }
  }

  const [tekstInputOK, settTekstInputOK] = useState<boolean>(false);
  const [manglerTekst, settManglerTekst] = useState<boolean>(false);
  const [brukerSpesialtegn, settBrukerSpesialtegn] = useState<boolean>(false);
  const [minimumTegnOppfylt, settMinimumTegnOppfylt] = useState<boolean>(false);
  const [knappTrykketPå, settKnappTrykketPå] = useState<boolean>(false);
  const [endringsmeldingTekst, settEndringsmeldingTekst] = useState<string>('');

  const validerTekst = (tekst: string) => {
    settEndringsmeldingTekst(tekst);
    settManglerTekst(tekst.length === 0);
    settMinimumTegnOppfylt(tekst.length > 9);
    if (tekst.match(spesialTegnRegex)) {
      settBrukerSpesialtegn(true);
    } else {
      settBrukerSpesialtegn(false);
    }
  };

  const utledFeilmelding = () => {
    if (manglerTekst) {
      return (
        <TekstBlokk tekstblokk={tekster.fritekstfeltFeilmeldingManglerTekst} />
      );
    } else if (brukerSpesialtegn) {
      return (
        <TekstBlokk tekstblokk={tekster.fritekstfeltFeilmeldingSpesialTegn} />
      );
    } else if (!minimumTegnOppfylt) {
      return <TekstBlokk tekstblokk={tekster.fritekstfeltFeilmeldingMinTegn} />;
    }
  };

  useEffect(() => {
    if (!manglerTekst && !brukerSpesialtegn && minimumTegnOppfylt) {
      settTekstInputOK(true);
    } else {
      settTekstInputOK(false);
    }
  }, [manglerTekst, brukerSpesialtegn, minimumTegnOppfylt]);

  async function gåVidere() {
    //send data til backend
    const response = await sendEndringsmelding(endringsmeldingTekst);
    //redirect til kvitteringsside
    console.log('response', response);
  }

  return (
    <HovedInnhold>
      <StegIndikator nåværendeSteg={1} />

      <TekstBlokk
        tekstblokk={tekster.overskrift}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
      />
      <Veiledning />

      <Textarea
        label={<TekstBlokk tekstblokk={tekster.fritekstfeltTittel} />}
        description={
          <TekstBlokk tekstblokk={tekster.fritekstfeltBeskrivelse} />
        }
        maxLength={MAKS_INPUT_LENGDE}
        className={`${css.fullBredde}`}
        i18n={i18nInnhold}
        error={!tekstInputOK && knappTrykketPå && utledFeilmelding()}
        onInput={event => {
          validerTekst(event.currentTarget.value);
        }}
      />
      <div className={`${css.navigeringsKnapper}`}>
        <Button
          variant={'secondary'}
          onClick={() => navigate(hentPathForSteg(ESteg.FORSIDE))}
        >
          <TekstBlokk tekstblokk={teksterFelles.knappTilbake} />
        </Button>
        <Button
          variant={tekstInputOK ? 'primary' : 'secondary'}
          onClick={() => {
            settKnappTrykketPå(true);
            tekstInputOK && gåVidere();
          }}
        >
          <TekstBlokk tekstblokk={teksterFelles.knappSendEndringer} />
        </Button>
      </div>
    </HovedInnhold>
  );
}
