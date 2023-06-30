import { useOutletContext } from '@remix-run/react';
import { AppContext } from '~/typer/context';
import { ESanitySteg } from '~/typer/sanity/sanity';

export function useTekster<Steg extends ESanitySteg>(steg: Steg) {
  const { sanityTekster } = useOutletContext<AppContext>();
  return sanityTekster[steg];
}

export function useSpråk() {
  const { språkContext } = useOutletContext<AppContext>();
  return språkContext;
}
