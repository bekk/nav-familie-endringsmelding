import { PortableTextBlock } from '@portabletext/types';

import { ESanityMappe } from '../felles';
import { EApiKeysFelles, FellesTekstinnhold } from './sanityFelles';
import { EApiKeysForside, ForsideTekstinnhold } from './sanityForside';
import { EApiKeysKvittering, KvitteringTekstinnhold } from './sanityKvittering';
import {
  EApiKeysSendEndring,
  SendEndringTekstinnhold,
} from './sanitySendEndring';

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
  mottatt_dato = 'MOTTATT_DATO',
}

export type FlettefeltVerdier = {
  søkerNavn?: string;
  mottattdato?: string;
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
