import { ActionArgs } from '@remix-run/node';
import React from 'react';

import { sendEndringsmelding } from '~/server/sendEndringsmelding.server';
import { getSession } from '~/sessions';
import SendEndringSide from '~/sider/SendEndring';
import { RESPONSE_STATUS_FEIL } from '~/typer/response';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const endringsmelding = formData.get('endringsmelding') as string;
  console.log(endringsmelding);
  return await sendEndringsmelding(
    endringsmelding,
    await getSession(request.headers.get('Cookie')),
  ).then(response => {
    if (response.ok) return response.json();
    return { text: RESPONSE_STATUS_FEIL };
  });
}

export default function SendEndringsmelding() {
  return <SendEndringSide />;
}
