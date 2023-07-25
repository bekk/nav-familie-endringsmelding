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
  filData: FormData,
  session: Session,
): Promise<IPostFilResponse> {
  const url = hentFilOpplastningURL();
  return await postFilMedToken(session, url, filData)
    .then(async response => {
      console.log(response);
      try {
        //Legg til fil ID i context her!!
        const nyFil: IFil = await response.json();

        return {
          response: nyFil,
          status: response.ok ? EStatusKode.OK : EStatusKode.FEILET,
        };
      } catch (e) {
        return { status: EStatusKode.FEILET };
      }
    })
    .catch(err => {
      return { status: EStatusKode.FEILET };
    });
}

export default lastOppFil;
