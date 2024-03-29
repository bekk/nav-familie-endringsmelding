import { EApiKeysSendEndring } from './sanity/sanitySendEndring';

export enum EFritekstFeil {
  MANGLER_TEKST = 'MANGLER_TEKST',
  OVER_MAKS_LENGDE = 'OVER_MAKS_LENGDE',
  HAR_SPESIAL_TEGN = 'HAR_SPESIAL_TEGN',
  MINDRE_ENN_TI_TEGN = 'MINDRE_ENN_TI_TEGN',
  INGEN_VALIDERINGSFEIL = 'INGEN_VALIDERINGSFEIL',
}

export const fritekstFeilTilApiKeys: Record<
  EFritekstFeil,
  EApiKeysSendEndring
> = {
  MANGLER_TEKST: EApiKeysSendEndring.FRITEKSTFELT_FEILMELDING_MANGLERTEKST,
  OVER_MAKS_LENGDE: EApiKeysSendEndring.FRITEKSTFELT_FEILMELDING_OVERMAKSLENGDE,
  HAR_SPESIAL_TEGN: EApiKeysSendEndring.FRITEKSTFELT_FEILMELDING_SPESIALTEGN,
  MINDRE_ENN_TI_TEGN: EApiKeysSendEndring.FRITEKSTFELT_FEILMELDING_MINTEGN,
  INGEN_VALIDERINGSFEIL: EApiKeysSendEndring.ALERT_FEIL_SENDENDRINGSMELDING,
};
