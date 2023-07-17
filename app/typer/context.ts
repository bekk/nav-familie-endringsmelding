import { Dispatch, SetStateAction } from 'react';

import { ELocaleType } from './felles';
import { ITekstinnhold } from './sanity/sanity';
import { ISøker } from './søker';

export interface IAppContext {
  sanityTekster: [ITekstinnhold, Dispatch<SetStateAction<ITekstinnhold>>];
  språk: [ELocaleType, Dispatch<SetStateAction<ELocaleType>>];
  søker: ISøker;
  endringsmeldingMottattDato: [string, Dispatch<SetStateAction<string>>];
  erSamtykkeBekreftet: [boolean, Dispatch<SetStateAction<boolean>>];
}
