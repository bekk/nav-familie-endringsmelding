import { ESteg } from '~/typer/felles';

export const hentPathForSteg = (steg: ESteg) => {
  switch (steg) {
    case ESteg.FORSIDE:
      return '/ba';
    case ESteg.SEND_ENDRINGER:
      return '/ba/endringsmelding';
    case ESteg.KVITTERING:
      return '/ba/kvittering';
    default:
      return '/ba'; //bør i fremtiden vise til feilmelding-side + error handling
  }
};
