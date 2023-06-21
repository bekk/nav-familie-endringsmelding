import { useOutletContext } from '@remix-run/react';
import { AppContext, ESanitySteg } from '~/typer/sanity/sanity';

export function useFornavn() {
  const { fornavn } = useOutletContext<AppContext>();
  return fornavn;
}

export function useTekster(steg: ESanitySteg) {
  const { sanityTekster } = useOutletContext<AppContext>();
  return sanityTekster[steg];
}
