import { ISanityDokument } from './sanity';

export enum EApiKeysDokumentasjon {
  DOKUMENTASJON = 'Dokumentasjon',
  OVERSKRIFT = 'dokumentasjonOverskrift',
  veiledning = 'veiledning',
}

export type DokumentasjonTekstInnhold = Record<
  EApiKeysDokumentasjon,
  ISanityDokument
>;
