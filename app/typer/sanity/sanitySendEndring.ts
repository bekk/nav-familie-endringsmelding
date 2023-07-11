import { ISanityDokument } from './sanity';

export enum EApiKeysSendEndring {
  OVERSKRIFT = 'overskrift',
  VEILEDER = 'veilederInnhold',
  FRITEKSTFELT_TITTEL = 'fritekstfeltTittel',
  FRITEKSTFELT_BESKRIVELSE = 'fritekstfeltBeskrivelse',
  FRITEKSTFELT_FEILMELDING_SPESIALTEGN = 'fritekstfeltFeilmeldingSpesialTegn',
  FRITEKSTFELT_FEILMELDING_MINTEGN = 'fritekstfeltFeilmeldingMinTegn',
  FRITEKSTFELT_FEILMELDING_MANGLERTEKST = 'fritekstfeltFeilmeldingManglerTekst',
  FRITEKSTFELT_FEILMELDING_OVERMAKSLENGDE = 'fritekstfeltFeilmeldingOverMaksLengde',
}

export type SendEndringTekstinnhold = Record<
  EApiKeysSendEndring,
  ISanityDokument
>;
