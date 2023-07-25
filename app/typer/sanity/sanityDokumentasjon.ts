import { ISanityDokument } from './sanity';

export enum EApiKeysDokumentasjon {
  OVERSKRIFT = 'dokumentasjonOverskrift',
  TA_GODT_BILDE_LINK = 'taGodtBildeLink',
  SLIK_TAR_DU_ET_GODT_BILDE = 'slikTarDuEtGodtBilde',
  ETTER_DU_HAR_TATT_BILDE = 'etterDuHarTattBilde',
  BRA_OG_DÅRLIG = 'braOgDaarligTittel',
  MER_HJELP_LENKE = 'merHjelpLenke',
  BRA_BILDE = 'braBilde',
  DÅRLIG_BILDE = 'daarligBilde',
  FYLLER_HELE_SIDEN = 'fyllerHeleSiden',
  BILDE_IKKE_TATT_OVENFRA = 'bildeIkkeTattOvenfra',
  BILDE_IKKE_RIKTIG_RETNING = 'bildeIkkeRiktigRetning',
  BILDE_HAR_SKYGGE = 'bildeHarSkygge',
}

export type DokumentasjonTekstInnhold = Record<
  EApiKeysDokumentasjon,
  ISanityDokument
>;
