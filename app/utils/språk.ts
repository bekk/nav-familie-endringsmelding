import { ELocaleType } from '~/typer/felles';

export const språkTittel: Record<ELocaleType, string> = {
  [ELocaleType.EN]: 'English',
  [ELocaleType.NB]: 'Bokmål',
  [ELocaleType.NN]: 'Nynorsk',
};

export const støttedeSpråk: ELocaleType[] = [
  ELocaleType.NB,
  ELocaleType.NN,
  ELocaleType.EN,
];
