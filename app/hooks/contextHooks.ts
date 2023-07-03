import { useOutletContext } from '@remix-run/react';
import { ESanityMappe } from '~/typer/felles';
import { IAppContext } from '~/typer/context';

export function useTekster<Steg extends ESanityMappe>(steg: Steg) {
  const { sanityTekster } = useOutletContext<IAppContext>();
  return sanityTekster[steg];
}

export function useSpråk() {
  const { språkContext } = useOutletContext<IAppContext>();
  return språkContext;
}

export function useBekreftetSamtykke() {
  const { erSamtykkeBekreftetContext } = useOutletContext<IAppContext>();
  return erSamtykkeBekreftetContext;
}
