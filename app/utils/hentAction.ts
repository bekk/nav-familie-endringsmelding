import { action as actionBA } from '~/routes/ba.dokumentasjon';
import { action as actionKS } from '~/routes/ks.dokumentasjon';
import { EYtelse } from '~/typer/ytelse';

export const hentAction = (ytelse: EYtelse) => {
  switch (ytelse) {
    case EYtelse.BARNETRYGD:
      return actionBA;
    case EYtelse.KONTANTSTØTTE:
      return actionKS;
  }
};
