import { Dispatch, SetStateAction } from 'react';

import { IEndringsmelding } from './endringsmelding';
import { ELocaleType } from './felles';
import { ITekstinnhold } from './sanity/sanity';
import { ISøker } from './søker';
import { EYtelse } from './ytelse';

export interface IAppContext {
  sanityTekster: ITekstinnhold;
  språk: [ELocaleType, Dispatch<SetStateAction<ELocaleType>>];
  søker: ISøker;
  erSamtykkeBekreftet: [boolean, Dispatch<SetStateAction<boolean>>];
  endringsmelding: [
    IEndringsmelding,
    Dispatch<SetStateAction<IEndringsmelding>>,
  ];
  endringsmeldingMottattDato: [string, Dispatch<SetStateAction<string>>];
  ytelse: EYtelse;
}
