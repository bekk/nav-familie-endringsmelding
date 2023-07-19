import { ESteg } from '~/typer/felles';
import { EYtelse } from '~/typer/ytelse';

const URL_BARNETRYGD = '/ba';
const URL_KONTANTSTØTTE = '/ks';

export const hentPathForYtelse = (ytelse: EYtelse) => {
  switch (ytelse) {
    case EYtelse.BARNETRYGD:
      return URL_BARNETRYGD;
    case EYtelse.KONTANTSTØTTE:
      return URL_KONTANTSTØTTE;
    default:
      return '/';
  }
};

export const hentPathForSteg = (ytelse: EYtelse, steg: ESteg) => {
  const urlForYtelse = hentPathForYtelse(ytelse);

  switch (steg) {
    case ESteg.FORSIDE:
      return urlForYtelse;
    case ESteg.SEND_ENDRINGER:
      return urlForYtelse + '/endringsmelding';
    case ESteg.KVITTERING:
      return urlForYtelse + '/kvittering';
    default:
      return urlForYtelse;
  }
};
