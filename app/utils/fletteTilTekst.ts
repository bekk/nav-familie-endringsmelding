import {
  ESanityFlettefeltverdi,
  FlettefeltVerdier,
} from '~/typer/sanity/sanity';

export const flettefeltTilTekst = (
  flettefeltType: ESanityFlettefeltverdi,
  flettefelter?: FlettefeltVerdier,
): string => {
  switch (flettefeltType) {
    case ESanityFlettefeltverdi.SØKER_NAVN:
      if (!flettefelter?.søkerNavn) {
        throw Error('Flettefeltet søkernavn ikke sendt med');
      }
      return flettefelter.søkerNavn;
    case ESanityFlettefeltverdi.INNSENDT_TID:
      if (!flettefelter?.innsendtTid) {
        throw Error('Flettefeltet innsendt tid ikke sendt med');
      }
      return flettefelter.innsendtTid;
  }
};
