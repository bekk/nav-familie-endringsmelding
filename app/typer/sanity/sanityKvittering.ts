import { ISanityDokument } from './sanity';

export enum EApiKeysKvittering {
  TITTEL = 'kvitteringTittel',
  BEKREFTELSEBOKS_INNHOLD = 'bekreftelseBoksInnhold',
}

export type KvitteringTekstinnhold = Record<
  EApiKeysKvittering,
  ISanityDokument
>;
