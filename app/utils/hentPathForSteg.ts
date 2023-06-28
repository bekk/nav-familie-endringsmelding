import { ESanitySteg } from '~/typer/sanity/sanity';

export const hentPathForSteg = (steg: ESanitySteg) => {
  switch (steg) {
    case ESanitySteg.FORSIDE:
      return '/';
    case ESanitySteg.SEND_ENDRINGER:
      return '/send-endringsmelding';
    default:
      return '/'; //bør i fremtiden vise til feilmelding-side + error handling
  }
};
