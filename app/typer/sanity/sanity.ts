import { PortableTextBlock } from '@portabletext/types';
import { ESteg } from '../common';
import { FellesTekstinnhold, EApiKeysFelles } from './sanityFelles';
import { ForsideTekstinnhold, EApiKeysForside } from './sanityForside';
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
  steg: ESteg;
  ytelse: string;
  nb: PortableTextBlock;
  nn: PortableTextBlock;
  en: PortableTextBlock;
}

export enum ESanityFlettefeltverdi {
  SØKER_NAVN = 'SØKER_NAVN',
}

export type FlettefeltVerdier = {
  søkerNavn?: string;
};

export interface ITekstinnhold {
  [ESteg.FORSIDE]: ForsideTekstinnhold;
  [ESteg.SEND_ENDRINGER]: SendEndringTekstinnhold;
  [ESteg.FELLES]: FellesTekstinnhold;
}

export type ApiKeys = EApiKeysForside | EApiKeysSendEndring | EApiKeysFelles;
