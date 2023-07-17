import { useOutletContext } from '@remix-run/react';

import { IAppContext } from '~/typer/context';
import { ESanityMappe } from '~/typer/felles';

export function useTekster<Steg extends ESanityMappe>(steg: Steg) {
  const { sanityTekster } = useOutletContext<IAppContext>();
  const [tekster] = sanityTekster;
  return tekster[steg];
}

export function useSpråk() {
  const { språk } = useOutletContext<IAppContext>();
  return språk;
}

export function useSøker() {
  const { søker } = useOutletContext<IAppContext>();
  return søker;
}

export function useBekreftetSamtykke() {
  const { erSamtykkeBekreftet } = useOutletContext<IAppContext>();
  return erSamtykkeBekreftet;
}

export function useEndringsmeldingMottattDato() {
  const { endringsmeldingMottattDato } = useOutletContext<IAppContext>();
  return endringsmeldingMottattDato;
}
