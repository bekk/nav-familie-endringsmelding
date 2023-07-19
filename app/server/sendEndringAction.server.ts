import { sendEndringsmelding } from '~/server/sendEndringsmelding.server';
import { getSession } from '~/sessions';
import { EStatusKode, IPostResponse } from '~/typer/response';

export default async function sendEndringAction(request: Request) {
  const formData = await request.formData();
  const endringsmelding = formData.get('endringsmelding') as string;
  return await sendEndringsmelding(
    endringsmelding,
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
        //Her kan feilkode være null, dermed kan null brukes når alerten skal spesifiseres senere
        return {
          status: EStatusKode.FEILET,
          feilKode: data?.response?.feil,
        } as IPostResponse;
      }
    });
}
