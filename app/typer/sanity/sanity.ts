import { PortableTextBlock } from '@portabletext/types';
import { ESanityMappe } from '../felles';
import { FellesTekstinnhold, EApiKeysFelles } from './sanityFelles';
import { ForsideTekstinnhold, EApiKeysForside } from './sanityForside';
import {
  EApiKeysSendEndring,
  SendEndringTekstinnhold,
} from './sanitySendEndring';
import { EApiKeysKvittering, KvitteringTekstinnhold } from './sanityKvittering';

export interface ISanityDokument {
  _createdAt: string;
  _rev: string;
  _type: string;
  _id: string;
  api_navn: string;
  visningsnavn: string;
  steg: ESanityMappe;
  ytelse: string;
  nb: PortableTextBlock;
  nn: PortableTextBlock;
  en: PortableTextBlock;
}

export enum ESanityFlettefeltverdi {
  SØKER_NAVN = 'SØKER_NAVN',
  INNSENDT_TID = 'INNSENDT_TID',
}

export type FlettefeltVerdier = {
  søkerNavn?: string;
  innsendtTid?: string;
};

export interface ITekstinnhold {
  [ESanityMappe.FORSIDE]: ForsideTekstinnhold;
  [ESanityMappe.SEND_ENDRINGER]: SendEndringTekstinnhold;
  [ESanityMappe.KVITTERING]: KvitteringTekstinnhold;
  [ESanityMappe.FELLES]: FellesTekstinnhold;
}

export type ApiKeys =
  | EApiKeysForside
  | EApiKeysSendEndring
  | EApiKeysKvittering
  | EApiKeysFelles;
