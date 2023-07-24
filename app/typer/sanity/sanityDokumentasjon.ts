import { ISanityDokument } from './sanity';

export enum EApiKeysDokumentasjon {
  DOKUMENTASJON = 'Dokumentasjon',
  OVERSKRIFT = 'dokumentasjonOverskrift',
}

export type DokumentasjonTekstInnhold = Record<
  EApiKeysDokumentasjon,
  ISanityDokument
>;
