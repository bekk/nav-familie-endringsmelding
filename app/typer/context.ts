import { Dispatch, SetStateAction } from 'react';
import { ITekstinnhold, LocaleType } from './sanity/sanity';

export interface AppContex {
  sanityTekster: ITekstinnhold;
  språkContext: [LocaleType, Dispatch<SetStateAction<LocaleType>>];
}
