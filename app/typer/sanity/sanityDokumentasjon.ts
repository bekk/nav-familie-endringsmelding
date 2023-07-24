import { ISanityDokument } from './sanity';

export enum EApiKeysDokumentasjon {
  DOKUMENTASJON = 'Dokumentasjon',
}

export type DokumentasjonTekstInnhold = Record<
  EApiKeysDokumentasjon,
  ISanityDokument
>;
