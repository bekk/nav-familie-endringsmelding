import { createClient } from '@sanity/client';
import { ESteg } from '~/typer/common';
import { ISanityDokument, ITekstinnhold } from '~/typer/sanity/sanity';

const sanityKlient = createClient({
  projectId: 'd8ycstqz',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});

export const hentDataFraSanity = async (): Promise<ITekstinnhold> => {
  const tekst = await sanityKlient.fetch<ISanityDokument[]>(
    '*[ytelse == "BARNETRYGD"]',
  );

  const tekstInnhold = {
    [ESteg.FORSIDE]: strukturerInnholdForSteg(tekst, ESteg.FORSIDE),
    [ESteg.SEND_ENDRINGER]: strukturerInnholdForSteg(
      tekst,
      ESteg.SEND_ENDRINGER,
    ),
  };

  return tekstInnhold;
};

const strukturerInnholdForSteg = (
  dokumenter: ISanityDokument[],
  steg: ESteg,
): Record<string, ISanityDokument> =>
  dokumenter
    .filter(dok => dok.steg === steg)
    .reduce((acc, dok) => {
      return { ...acc, [dok.api_navn]: dok };
    }, {});
