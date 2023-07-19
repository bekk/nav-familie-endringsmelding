import { ELocaleType } from '~/typer/felles';
import { EFritekstFeil } from '~/typer/fritekstfeil';

export const SPESIAL_TEGN_REGEX = /[!@#$%^&*()?"{}|<>+¨=]/;
export const MIN_INPUT_LENGDE = 10;
export const MAKS_INPUT_LENGDE = 1000;

const hentI18nInnhold = (språk: ELocaleType, tegnIgjen: boolean) => {
  switch (språk) {
    case ELocaleType.NB:
      return tegnIgjen ? 'tegn igjen' : 'tegn for mye';
    case ELocaleType.NN:
      return tegnIgjen ? 'teikn igjen' : 'teikn for mykje';
    case ELocaleType.EN:
      return tegnIgjen ? 'characters left' : 'characters too many';
  }
};

export const i18nInnhold = (språk: ELocaleType) => {
  return {
    counterTooMuch: hentI18nInnhold(språk, true),
    counterLeft: hentI18nInnhold(språk, false),
  };
};

export const validerTekst = (endringsmelding: string): EFritekstFeil | null => {
  return null;
  if (endringsmelding.length === 0) {
    return EFritekstFeil.MANGLER_TEKST;
  }
  if (endringsmelding.length >= MAKS_INPUT_LENGDE) {
    return EFritekstFeil.OVER_MAKS_LENGDE;
  }
  if (endringsmelding.length < MIN_INPUT_LENGDE) {
    return EFritekstFeil.MINDRE_ENN_TI_TEGN;
  }
  if (endringsmelding.match(SPESIAL_TEGN_REGEX)) {
    return EFritekstFeil.HAR_SPESIAL_TEGN;
  }
  return null;
};
