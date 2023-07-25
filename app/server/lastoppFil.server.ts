import { Session } from '@remix-run/node';

import { IFil, IPostFilResponse } from '~/typer/filopplastning';
import { EMiljø } from '~/typer/miljø';
import { EStatusKode } from '~/typer/response';

import { postFilMedToken } from './authorization';

const hentFilOpplastningURL = () => {
  const sti = '/api/dokument';

  switch (process.env.ENV) {
    case EMiljø.LOKAL:
      return 'http://localhost:8099' + sti;
    case EMiljø.MOCK:
    case EMiljø.PRODUKSJON:
    default:
      return 'https://nav-familie-endringsmelding-api.fly.dev' + sti;
  }
};

async function lastOppFil(
  fil: File,
  session: Session,
): Promise<IPostFilResponse> {
  const url = hentFilOpplastningURL();
  return await postFilMedToken(session, url, undefined, fil)
    .then(async response => {
      console.log(response);
      try {
        const responseJson: IFil = await response.json();
        return {
          response: responseJson,
          status: response.ok ? EStatusKode.OK : EStatusKode.FEILET,
        };
      } catch (e) {
        console.log('Feil ved parsing');
        return { status: EStatusKode.FEILET };
      }
    })
    .catch(err => {
      // Uventet feil!
      console.log('Uventet feil:', err);
      return { status: EStatusKode.FEILET };
    });
}

export default lastOppFil;
