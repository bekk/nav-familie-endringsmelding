import { Dispatch, SetStateAction } from 'react';
import { ITekstinnhold, LocaleType } from './sanity/sanity';

export interface AppContext {
  sanityTekster: ITekstinnhold;
  språkContext: [LocaleType, Dispatch<SetStateAction<LocaleType>>];
}
