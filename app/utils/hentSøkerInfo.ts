import { ISøker } from '~/typer/søker';

export function hentSøkerFornavn(søker: ISøker) {
  let fornavn: string = søker.visningsnavn.trim();
  return fornavn.split(' ')[0];
}
