import { ESteg } from '~/typer/felles';

export const hentPathForSteg = (steg: ESteg) => {
  switch (steg) {
    case ESteg.FORSIDE:
      return '/';
    case ESteg.SEND_ENDRINGER:
      return '/send-endringsmelding';
    case ESteg.KVITTERING:
      return '/kvittering';
    default:
      return '/'; //bør i fremtiden vise til feilmelding-side + error handling
  }
};
