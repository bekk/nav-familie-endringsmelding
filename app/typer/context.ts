import { ITekstinnhold } from './sanity/sanity';
import { ELocaleType } from './felles';
import { ISøker } from './søker';
import { Dispatch, SetStateAction } from 'react';

export interface IAppContext {
  sanityTekster: ITekstinnhold;
  språk: [ELocaleType, Dispatch<SetStateAction<ELocaleType>>];
  søker: ISøker;
  erSamtykkeBekreftet: [boolean, Dispatch<SetStateAction<boolean>>];
}
