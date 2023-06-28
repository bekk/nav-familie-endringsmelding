import { useOutletContext } from '@remix-run/react';
import { ESteg } from '~/typer/common';
import { IAppContext } from '~/typer/context';

export function useTekster(steg: ESteg) {
  const { sanityTekster } = useOutletContext<IAppContext>();
  return sanityTekster[steg];
}

export function useSpråk() {
  const { språkContext } = useOutletContext<IAppContext>();
  return språkContext;
}
