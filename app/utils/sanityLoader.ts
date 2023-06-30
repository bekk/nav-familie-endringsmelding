import { createClient } from '@sanity/client';
import { ESteg } from '~/typer/common';
import { ITekstinnhold, ISanityDokument, ApiKeys } from '~/typer/sanity/sanity';

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

  if (tekst.length === 0) {
    throw Error('Kunne ikke hente søker data');
  }
  const tekstInnhold = {
    [ESteg.FORSIDE]: strukturerInnholdForSteg(tekst, ESteg.FORSIDE),
    [ESteg.SEND_ENDRINGER]: strukturerInnholdForSteg(
      tekst,
      ESteg.SEND_ENDRINGER,
    ),
    [ESteg.FELLES]: strukturerInnholdForSteg(tekst, ESteg.FELLES),
  };

  return tekstInnhold;
};

const strukturerInnholdForSteg = (
  dokumenter: ISanityDokument[],
  steg: ESteg,
): Record<ApiKeys, ISanityDokument> =>
  dokumenter
    .filter(dok => dok.steg === steg)
    .reduce((acc, dok) => {
      return { ...acc, [dok.api_navn]: dok };
    }, {} as Record<ApiKeys, ISanityDokument>);
