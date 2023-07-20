import { Dispatch, SetStateAction } from 'react';

import { ELocaleType } from './felles';
import { ITekstinnhold } from './sanity/sanity';
import { ISøker } from './søker';
import { EYtelse } from './ytelse';

export interface IAppContext {
  sanityTekster: ITekstinnhold;
  språk: [ELocaleType, Dispatch<SetStateAction<ELocaleType>>];
  søker: ISøker;
  endringsmeldingMottattDato: [string, Dispatch<SetStateAction<string>>];
  erSamtykkeBekreftet: [boolean, Dispatch<SetStateAction<boolean>>];
  ytelse: EYtelse;
}
