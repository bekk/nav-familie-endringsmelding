import { useOutletContext } from '@remix-run/react';
import { AppContext } from '~/typer/context';

export function useBekreftetSamtykke() {
  const { erSamtykkeBekreftetContext } = useOutletContext<AppContext>();
  return erSamtykkeBekreftetContext;
}
