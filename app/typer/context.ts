import { ITekstinnhold, LocaleType } from './sanity/sanity';
import { ISøker } from './søker';

export interface AppContext {
  sanityTekster: ITekstinnhold;
  språk: [LocaleType, React.Dispatch<React.SetStateAction<LocaleType>>];
  søker: ISøker;
}
