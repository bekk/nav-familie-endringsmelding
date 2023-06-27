import React, { useEffect, useState } from 'react';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { useSpråk, useTekster } from '~/hooks/contextHooks';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import css from './send-endringsmelding.module.css';
import cssFritekst from './fritekstfelt.module.css';

import { Button, Textarea } from '@navikt/ds-react';
import { hentPathForSteg } from '~/utils/hentPathForSteg';
import { useNavigate } from '@remix-run/react';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanitySteg.SEND_ENDRINGER);
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

  const sjekkTekst = (input: string) => {
    const innholdVerdi = input;
    if (innholdVerdi.length == 0) {
      settManglerTekst(true);
    } else {
      settManglerTekst(false);
    }

    if (innholdVerdi.length > 9) {
      settMinimumTegnOppfylt(true);
    } else {
      settMinimumTegnOppfylt(false);
    }

    if (innholdVerdi.match(spesialTegnRegex)) {
      settBrukerSpesialtegn(true);
    } else {
      settBrukerSpesialtegn(false);
    }
  };

  const utledFeilmelding = () => {
    if (manglerTekst) {
      return <TekstBlokk tekstblokk={tekster.fritekstfeltFeilmeldingTekst} />;
    } else if (brukerSpesialtegn) {
      return <TekstBlokk tekstblokk={tekster.fritekstfeltFeilmeldingTegn} />;
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

  return (
    <InnholdKonteiner>
      <>
        <TekstBlokk
          tekstblokk={tekster.overskrift}
          typografi={TypografiTyper.StegHeadingH1}
        />
        <Textarea
          label={<TekstBlokk tekstblokk={tekster.fritekstfeltTittel} />}
          description={
            <TekstBlokk tekstblokk={tekster.fritekstfeltBeskrivelse} />
          }
          maxLength={MAKS_INPUT_LENGDE}
          className={`${cssFritekst.fritekstfelt}`}
          i18n={i18nInnhold}
          error={!tekstInputOK && knappTrykketPå && utledFeilmelding()}
          onInput={event => {
            sjekkTekst(event.currentTarget.value);
          }}
        />
        <div className={`${css.navigeringsKnapper}`}>
          <Button
            variant={'secondary'}
            onClick={() => navigate(hentPathForSteg(ESanitySteg.FORSIDE))}
          >
            Tilbake
          </Button>
          <Button
            variant={tekstInputOK ? 'primary' : 'secondary'}
            onClick={() => {
              settKnappTrykketPå(true);
              tekstInputOK && console.log('går til neste side');
            }}
            //Teksten for knappene her må hentes på ulike språk
          >
            Gå videre
          </Button>
        </div>
      </>
    </InnholdKonteiner>
  );
}
