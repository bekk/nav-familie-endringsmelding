import { ESanityFlettefeltverdi } from '~/typer/sanity/sanity';
import { hentSøkerFornavn } from './hentFraApi';

export const flettefeltTilTekst = (
  sanityFlettefelt: ESanityFlettefeltverdi,
  flettefelter?: string,
): string => {
  switch (sanityFlettefelt) {
    case ESanityFlettefeltverdi.SØKER_NAVN:
      return hentSøkerFornavn();
  }
};
