import { ISanityDokument } from './sanity';

export enum EApiKeysKvittering {
  TITTEL = 'kvitteringTittel',
  VEILEDER = 'kvitteringVeileder',
}

export type KvitteringTekstinnhold = Record<
  EApiKeysKvittering,
  ISanityDokument
>;
