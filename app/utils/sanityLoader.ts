import { useOutletContext } from '@remix-run/react';
import { createClient } from '@sanity/client';
import { AppContext } from '~/typer/context';

import {
  ESanitySteg,
  ITekstinnhold,
  SanityDokument,
} from '~/typer/sanity/sanity';

const sanityKlient = createClient({
  projectId: 'd8ycstqz',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});

export const hentDataFraSanity = async (): Promise<ITekstinnhold> => {
  const tekst = await sanityKlient.fetch<SanityDokument[]>(
    '*[ytelse == "BARNETRYGD"]',
  );

  const tekstInnhold = {
    [ESanitySteg.FORSIDE]: strukturerInnholdForSteg(tekst, ESanitySteg.FORSIDE),
  };

  return tekstInnhold;
};

const strukturerInnholdForSteg = (
  dokumenter: SanityDokument[],
  steg: ESanitySteg,
): Record<string, SanityDokument> =>
  dokumenter
    .filter(dok => dok.steg === steg)
    .reduce((acc, dok) => {
      return { ...acc, [dok.api_navn]: dok };
    }, {});

export function useTekster(steg: ESanitySteg) {
  const { sanityTekster } = useOutletContext<AppContext>();
  return sanityTekster[steg];
}
