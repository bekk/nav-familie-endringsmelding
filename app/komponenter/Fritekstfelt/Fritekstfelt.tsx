import { Textarea } from '@navikt/ds-react';
import css from './fritekstfelt.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { useSpråk } from '~/hooks/contextHooks';
import { FormEvent, useState } from 'react';

interface Props {
  tittel: SanityDokument | undefined;
  hjelpetekst: SanityDokument | undefined;
  feilmeldingManglerTekst: SanityDokument | undefined;
  feilmeldingManglerTegn: SanityDokument | undefined;
}

const Fritekstfelt: React.FC<Props> = ({
  tittel,
  hjelpetekst,
  feilmeldingManglerTekst,
  feilmeldingManglerTegn,
}: Props) => {
  const [språk] = useSpråk();
  const spesialTegnRegex = /[!@#$%^&*()?"{}|<>+¨]/;
  const [manglerTekst, settManglerTekst] = useState<boolean>(true);
  const [brukerSpesialtegn, settBrukerSpesialtegn] = useState<boolean>(false);
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

  const sjekkTekstInput = (handling: FormEvent<HTMLTextAreaElement>) => {
    const innholdVerdi = handling.currentTarget.value;

    if (innholdVerdi.length == 0) {
      settManglerTekst(true);
    } else {
      settManglerTekst(false);
    }

    if (innholdVerdi.match(spesialTegnRegex)) {
      settBrukerSpesialtegn(true);
    } else {
      settBrukerSpesialtegn(false);
    }
  };

  return (
    <Textarea
      label={<TekstBlokk tekstblokk={tittel} />}
      description={<TekstBlokk tekstblokk={hjelpetekst} />}
      maxLength={1000}
      className={`${css.fritekstfelt}`}
      i18n={i18nInnhold}
      error={
        manglerTekst ? (
          <TekstBlokk tekstblokk={feilmeldingManglerTekst} />
        ) : (
          brukerSpesialtegn && (
            <TekstBlokk tekstblokk={feilmeldingManglerTegn} />
          )
        )
      }
      onInput={handling => sjekkTekstInput(handling)}
    />
  );
};

export default Fritekstfelt;
