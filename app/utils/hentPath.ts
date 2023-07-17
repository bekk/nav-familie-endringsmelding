import { ESteg } from '~/typer/felles';
import { EYtelse } from '~/typer/ytelse';

export const hentPathForYtelse = (ytelse: EYtelse) => {
  switch (ytelse) {
    case EYtelse.BARNETRYGD:
      return '/ba';
    case EYtelse.KONTANTSTØTTE:
      return '/ks';
    default:
      return '/';
  }
};

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
