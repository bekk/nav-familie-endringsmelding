import { sendEndringsmelding } from '~/server/sendEndringsmelding.server';
import { getSession } from '~/sessions';
import { IEndringsmelding } from '~/typer/endringsmelding';
import { EFritekstFeil } from '~/typer/fritekstfeil';
import { EStatusKode, IPostResponse } from '~/typer/response';
import { EYtelse } from '~/typer/ytelse';
import { hentAPIPathForYtelse } from '~/utils/hentPath';

export default async function sendEndringAction(
  request: Request,
  ytelse: EYtelse,
) {
  const formData = await request.formData();
  const endringsmeldingTekst = formData.get('endringsmelding') as string;
  const endringsmelding: IEndringsmelding = {
    tekst: endringsmeldingTekst,
    dokumenter: [],
  };
  const ytelseSti = hentAPIPathForYtelse(ytelse);
  return await sendEndringsmelding(
    endringsmelding,
    ytelseSti,
    await getSession(request.headers.get('Cookie')),
  )
    .then(async response => {
      try {
        const responseJson = await response.json();
        return { response: responseJson, status: response.status };
      } catch (e) {
        return { status: response.status };
      }
    })
    .then(data => {
      if (data.status === 200) {
        return {
          status: EStatusKode.OK,
          data: { mottattDato: data.response.mottattDato },
        } as IPostResponse;
      } else {
        return {
          status: EStatusKode.FEILET,
          feilKode: Object.values(EFritekstFeil).includes(data?.response?.feil)
            ? data?.response?.feil
            : EFritekstFeil.INGEN_VALIDERINGSFEIL,
        } as IPostResponse;
      }
    });
}
