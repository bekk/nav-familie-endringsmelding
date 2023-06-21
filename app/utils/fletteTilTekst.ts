import { ESanityFlettefeltverdi } from '~/typer/sanity/sanity';

export const flettefeltTilTekst = (
  flettefeltType: ESanityFlettefeltverdi,
  flettefeltInnhold: string,
): string => {
  switch (flettefeltType) {
    case ESanityFlettefeltverdi.SØKER_NAVN:
      return flettefeltInnhold;
  }
};
