import { ESteg } from '~/typer/felles';
import { EYtelse } from '~/typer/ytelse';

const urlForBarnetrygd = '/ba';
const urlForKontantstøtte = '/ks';

export const hentPathForYtelse = (ytelse: EYtelse) => {
  switch (ytelse) {
    case EYtelse.BARNETRYGD:
      return urlForBarnetrygd;
    case EYtelse.KONTANTSTØTTE:
      return urlForKontantstøtte;
    default:
      return '/';
  }
};

export const hentPathForSteg = (ytelse: EYtelse, steg: ESteg) => {
  let urlForYtelse = '';
  if (ytelse === EYtelse.BARNETRYGD) {
    urlForYtelse = urlForBarnetrygd;
  } else if (ytelse === EYtelse.KONTANTSTØTTE) {
    urlForYtelse = urlForKontantstøtte;
  }
  switch (steg) {
    case ESteg.FORSIDE:
      return urlForYtelse;
    case ESteg.SEND_ENDRINGER:
      return urlForYtelse + '/endringsmelding';
    case ESteg.KVITTERING:
      return urlForYtelse + '/kvittering';
    default:
      return urlForYtelse; //bør i fremtiden vise til feilmelding-side + error handling
  }
};
