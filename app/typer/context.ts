import { ITekstinnhold } from './sanity/sanity';
import { ELocaleType } from './felles';
import { ISøker } from './søker';
import { Dispatch, SetStateAction } from 'react';

export interface IAppContext {
  sanityTekster: ITekstinnhold;
  språkContext: [ELocaleType, Dispatch<SetStateAction<ELocaleType>>];
  søker: ISøker;
  erSamtykkeBekreftetContext: [boolean, Dispatch<SetStateAction<boolean>>];
  endringsmeldingMottattDato: [string, Dispatch<SetStateAction<string>>];
}
