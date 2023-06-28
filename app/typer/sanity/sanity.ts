import { PortableTextBlock } from '@portabletext/types';
import { ESteg } from '../common';

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

export type ForsideTekstinnhold = Record<string, ISanityDokument>;

export interface ITekstinnhold {
  [ESteg.FORSIDE]: ForsideTekstinnhold;
  [ESteg.SEND_ENDRINGER]: ForsideTekstinnhold;
}

export enum ESanityFlettefeltverdi {
  SØKER_NAVN = 'SØKER_NAVN',
}

export type FlettefeltVerdier = {
  søkerNavn?: string;
};
