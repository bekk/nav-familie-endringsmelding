import { createClient } from '@sanity/client';

import { ESanityMappe } from '~/typer/felles';
import { ApiKeys, ISanityDokument, ITekstinnhold } from '~/typer/sanity/sanity';

const sanityKlient = createClient({
  projectId: 'd8ycstqz',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});

export const hentSanityData = async (): Promise<ITekstinnhold> => {
  const tekst = await sanityKlient.fetch<ISanityDokument[]>(
    '*[ytelse == "BARNETRYGD"]',
  );

  if (tekst.length === 0) {
    throw Error('Kunne ikke hente sanity data');
  }
  const tekstInnhold = {
    [ESanityMappe.FORSIDE]: strukturerInnholdForSteg(
      tekst,
      ESanityMappe.FORSIDE,
    ),
    [ESanityMappe.SEND_ENDRINGER]: strukturerInnholdForSteg(
      tekst,
      ESanityMappe.SEND_ENDRINGER,
    ),
    [ESanityMappe.KVITTERING]: strukturerInnholdForSteg(
      tekst,
      ESanityMappe.KVITTERING,
    ),
    [ESanityMappe.FELLES]: strukturerInnholdForSteg(tekst, ESanityMappe.FELLES),
  };

  return tekstInnhold;
};

const strukturerInnholdForSteg = (
  dokumenter: ISanityDokument[],
  steg: ESanityMappe,
): Record<ApiKeys, ISanityDokument> =>
  dokumenter
    .filter(dok => dok.steg === steg)
    .reduce((acc, dok) => {
      return { ...acc, [dok.api_navn]: dok };
    }, {} as Record<ApiKeys, ISanityDokument>);
