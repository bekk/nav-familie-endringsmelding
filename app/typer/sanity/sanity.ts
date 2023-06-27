import { PortableTextBlock } from '@portabletext/types';
import { EApiKeysForside, IForsideTekstinnhold } from './sanityForside';

export interface SanityDokument {
  _createdAt: string;
  _rev: string;
  _type: string;
  _id: string;
  api_navn: string;
  visningsnavn: string;
  steg: ESanitySteg;
  ytelse: string;
  nb: PortableTextBlock;
  nn: PortableTextBlock;
  en: PortableTextBlock;
}

export enum LocaleType {
  en = 'en',
  nb = 'nb',
  nn = 'nn',
}

export enum ESanitySteg {
  FORSIDE = 'FORSIDE',
}

export enum ESanityFlettefeltverdi {
  SØKER_NAVN = 'SØKER_NAVN',
}

export type FlettefeltVerdier = {
  søkerNavn?: string;
};

export interface ITekstinnhold {
  [ESanitySteg.FORSIDE]: IForsideTekstinnhold;
}

//For typen ApiKeys må nye sider legges til på formatet: EApiKeysForside | EApiKeysSide;
export type ApiKeys = EApiKeysForside;
