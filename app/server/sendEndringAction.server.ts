import { sendEndringsmelding } from '~/server/sendEndringsmelding.server';
import { getSession } from '~/sessions';
import { RESPONSE_STATUS_FEIL } from '~/typer/response';

export default async function sendEndringAction(request: Request) {
  const formData = await request.formData();
  const endringsmelding = formData.get('endringsmelding') as string;
  return await sendEndringsmelding(
    endringsmelding,
    await getSession(request.headers.get('Cookie')),
  )
    .then(async response => {
      //if(response.ok) return response.json();
      console.log('response', response);
      try {
        const responseJson = await response.json();
        return { response: responseJson, status: response.status };
      } catch (e) {
        //generell feil enum ikke RES..
        return {
          response: { feil: RESPONSE_STATUS_FEIL, status: response.status },
        };
      }
      /* const res = { text: RESPONSE_STATUS_FEIL, grunn: null}
    console.log("RESPONSE",response)
    response.json().then((data)=>  {res.grunn = data});
    return res; */
      /*  response.json().then((data)=>  {console.log(data)})
    return {text: RESPONSE_STATUS_FEIL, grunn: null }
 */
    })
    .then(data => {
      console.log('data', data);
      if (data.status === 200) {
        return { status: 'OK', data: data };
      } else {
        return { status: 'FEILET', feilKode: data.response.feil };
      }
    });
}
