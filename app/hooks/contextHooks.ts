import { useOutletContext } from '@remix-run/react';
import { ESanityMappe } from '~/typer/felles';
import { IAppContext } from '~/typer/context';

export function useTekster<Steg extends ESanityMappe>(steg: Steg) {
  const { sanityTekster } = useOutletContext<IAppContext>();
  return sanityTekster[steg];
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
