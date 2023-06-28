import { ESteg } from '~/typer/common';

export const hentPathForSteg = (steg: ESteg) => {
  switch (steg) {
    case ESteg.FORSIDE:
      return '/';
    case ESteg.SEND_ENDRINGER:
      return '/send-endringsmelding';
    default:
      return '/'; //bør i fremtiden vise til feilmelding-side + error handling
  }
};
