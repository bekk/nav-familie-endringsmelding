import { ITekstinnhold, LocaleType } from './sanity/sanity';
import { ISøker } from './søker';
import { Dispatch, SetStateAction } from 'react';

export interface AppContext {
  sanityTekster: ITekstinnhold;
  språkContext: [LocaleType, Dispatch<SetStateAction<LocaleType>>];
  søker: ISøker;
  erSamtykkeBekreftetContext: [boolean, Dispatch<SetStateAction<boolean>>];
}
