import { ELocaleType } from '~/typer/felles';

function hentI18nInnhold(språk: ELocaleType, tegnIgjen: boolean) {
  switch (språk) {
    case ELocaleType.NB:
      return tegnIgjen ? 'tegn igjen' : 'tegn for mye';
    case ELocaleType.NN:
      return tegnIgjen ? 'teikn igjen' : 'teikn for mykje';
    case ELocaleType.EN:
      return tegnIgjen ? 'characters left' : 'characters too many';
  }
}

export const i18nInnhold = (språk: ELocaleType) => {
  return {
    counterTooMuch: hentI18nInnhold(språk, true),
    counterLeft: hentI18nInnhold(språk, false),
  };
};
