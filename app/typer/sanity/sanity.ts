import { PortableTextBlock } from '@portabletext/types';

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
  SEND_ENDRINGER = 'SEND_ENDRINGER',
}

export type IForsideTekstinnhold = Record<string, SanityDokument>;

export interface ITekstinnhold {
  [ESanitySteg.FORSIDE]: IForsideTekstinnhold;
  [ESanitySteg.SEND_ENDRINGER]: IForsideTekstinnhold;
}

export enum ESanityFlettefeltverdi {
  SØKER_NAVN = 'SØKER_NAVN',
}

export type FlettefeltVerdier = {
  søkerNavn?: string;
};
