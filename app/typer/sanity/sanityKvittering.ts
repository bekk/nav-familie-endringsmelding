import { ISanityDokument } from './sanity';

export enum EApiKeysKvittering {
  TITTEL = 'kvitteringTittel',
}

export type KvitteringTekstinnhold = Record<
  EApiKeysKvittering,
  ISanityDokument
>;
