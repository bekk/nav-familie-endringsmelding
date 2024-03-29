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
    case ESanityFlettefeltverdi.MOTTATT_DATO:
      if (!flettefelter?.mottattDato) {
        throw Error('Flettefeltet innsendt tid ikke sendt med');
      }
      return flettefelter.mottattDato;
  }
};
