import { useOutletContext } from '@remix-run/react';
import { AppContext } from '~/typer/context';

export function useTekster() {
  const { sanityTekster } = useOutletContext<AppContext>();
  return sanityTekster;
}

export function useSpråk() {
  const { språkContext } = useOutletContext<AppContext>();
  return språkContext;
}
