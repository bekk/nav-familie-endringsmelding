import { PortableTextBlock } from '@portabletext/types';

export interface SanityDokument {
  _createdAt: string;
  _rev: string;
  _type: string;
  _id: string;
  api_navn: ESanityApiKey;
  visningsnavn: string;
  /*  nb: CustomSanityTyper.CUSTUM_BLOCK;
  nn: CustomSanityTyper.CUSTUM_BLOCK;
  en: CustomSanityTyper.CUSTUM_BLOCK; */
}

/* export enum CustomSanityTyper {
  CUSTUM_BLOCK = 'customBlock',
} */

export enum ESanityApiKey {
  TITTEL = 'tittelPaForside',
  PUNKTLISTE = 'punktlisteMedEndringsgrunner',
  TITTEL_PUNKTLISTE = 'tittelPunktlisteMedEndringsgrunner',
}

export type TextBlock = Record<ESanityApiKey, string> & {
  api_navn: string;
  [key: string]: unknown;
};

export interface IForsideTekstinnhold {
  tittel: LocaleRecordString;
  punktliste: LocaleRecordBlock;
}

//import { LocaleType } from '@navikt/familie-sprakvelger';
export enum LocaleType {
  en = 'en',
  nb = 'nb',
  nn = 'nn',
}

//Ikke brukt enda, men notert at det er gjort i eksempel repo
export type LocaleRecordString = Record<LocaleType, string> & {
  api_navn: string;
  [key: string]: unknown;
};

export type LocaleRecordBlock = Record<LocaleType, PortableTextBlock[]> & {
  api_navn: string;
  [key: string]: unknown;
};
