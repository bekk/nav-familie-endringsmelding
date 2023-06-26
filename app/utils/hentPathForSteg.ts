import { ESanitySteg } from '~/typer/sanity/sanity';

export const hentPathForSteg = (steg: ESanitySteg) => {
  //midlertidig metode. bør sikkert bruke en switch?
  //bør også ha en error handling. Per nå returnerer den til index ved manglende path
  if (steg === 'FORSIDE') {
    return '/';
  } else if (steg === 'SEND_ENDRINGER') {
    return '/send-endringsmelding';
  } else {
    return '/';
  }
};
