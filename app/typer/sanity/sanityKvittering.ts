import { ISanityDokument } from './sanity';

export enum EApiKeysKvittering {
  TITTEL = 'kvitteringTittel',
  BEKREFTELSEBOKS_INNHOLD = 'bekreftelseBoksInnhold',
  VEILEDER = 'kvitteringVeileder',
}

export type KvitteringTekstinnhold = Record<
  EApiKeysKvittering,
  ISanityDokument
>;
