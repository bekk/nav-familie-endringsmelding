import { ITekstinnhold } from './sanity/sanity';
import { ELocaleType } from './common';
import { ISøker } from './søker';
import { Dispatch, SetStateAction } from 'react';

export interface IAppContext {
  sanityTekster: ITekstinnhold;
  språkContext: [ELocaleType, Dispatch<SetStateAction<ELocaleType>>];
  søker: ISøker;
}
