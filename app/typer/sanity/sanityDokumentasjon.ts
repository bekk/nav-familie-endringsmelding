import { ISanityDokument } from './sanity';

export enum EApiKeysDokumentasjon {
  DOKUMENTASJON = 'Dokumentasjon',
  OVERSKRIFT = 'dokumentasjonOverskrift',
  INFOMELLOMLAGRING = 'infomellomLagring',
}

export type DokumentasjonTekstInnhold = Record<
  EApiKeysDokumentasjon,
  ISanityDokument
>;
