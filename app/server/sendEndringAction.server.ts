import { sendEndringsmelding } from '~/server/sendEndringsmelding.server';
import { getSession } from '~/sessions';
import { RESPONSE_STATUS_FEIL } from '~/typer/response';

export default async function sendEndringAction(request: Request) {
  const formData = await request.formData();
  const endringsmelding = formData.get('endringsmelding') as string;
  return await sendEndringsmelding(
    endringsmelding,
    await getSession(request.headers.get('Cookie')),
  ).then(response => {
    if (response.ok) return response.json();
    return { text: RESPONSE_STATUS_FEIL };
  });
}
