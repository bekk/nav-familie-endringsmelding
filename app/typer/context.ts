import { ITekstinnhold, LocaleType } from './sanity/sanity';

export interface IBrukerdata {
  fornavn: string;
}
export interface AppContext {
  sanityTekster: ITekstinnhold;
  språk: [LocaleType, React.Dispatch<React.SetStateAction<LocaleType>>];
  brukerdata: IBrukerdata;
}
