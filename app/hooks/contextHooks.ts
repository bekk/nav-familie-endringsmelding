import { useOutletContext } from '@remix-run/react';
import { AppContext } from '~/typer/context';
import { ESanitySteg } from '~/typer/sanity/sanity';

export function useFornavn() {
  const { brukerdata } = useOutletContext<AppContext>();
  return brukerdata.fornavn;
}

export function useTekster(steg: ESanitySteg) {
  const { sanityTekster } = useOutletContext<AppContext>();
  return sanityTekster[steg];
}
