import { ISanityDokument } from './sanity';

export enum EApiKeysDokumentasjon {
  DOKUMENTASJON = 'Dokumentasjon',
  OVERSKRIFT = 'dokumentasjonOverskrift',
  INFOMELLOMLAGRING = 'infoMellomlagring',
}

export type DokumentasjonTekstInnhold = Record<
  EApiKeysDokumentasjon,
  ISanityDokument
>;
