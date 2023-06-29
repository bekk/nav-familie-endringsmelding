import { useOutletContext } from '@remix-run/react';
import { IAppContext } from '~/typer/context';

export function useTekster() {
  const { sanityTekster } = useOutletContext<IAppContext>();
  return sanityTekster;
}

export function useSpråk() {
  const { språkContext } = useOutletContext<IAppContext>();
  return språkContext;
}
