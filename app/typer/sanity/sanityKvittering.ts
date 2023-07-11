import { ISanityDokument } from './sanity';

export enum EApiKeysKvittering {}

export type KvitteringTekstinnhold = Record<
  EApiKeysKvittering,
  ISanityDokument
>;
