import { useOutletContext } from '@remix-run/react';
import { AppContext } from '~/typer/context';
import { ESanitySteg, Tekstinnhold } from '~/typer/sanity/sanity';

export function useTekster(steg: ESanitySteg) {
  const { sanityTekster } = useOutletContext<AppContext>();
  return sanityTekster[steg] as Tekstinnhold;
}

export function useSpråk() {
  const { språkContext } = useOutletContext<AppContext>();
  return språkContext;
}
