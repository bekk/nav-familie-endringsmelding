import { ActionArgs } from '@remix-run/node';

import lastOppFilAction from '~/server/lastoppFilAction.server';
import sendEndringAction from '~/server/sendEndringAction.server';
import DokumentasjonSide from '~/sider/Dokumentasjon';
import { EAction } from '~/typer/action';
import { EYtelse } from '~/typer/ytelse';

export async function action({ request }: ActionArgs) {
  const formdata = await request.clone().formData();
  const actionType = formdata.get('_action');

  if (actionType === EAction.LAST_OPP_FIL) {
    return await lastOppFilAction(request.clone());
  } else if (actionType === EAction.SEND_ENDRINGER) {
    return sendEndringAction(request.clone(), EYtelse.KONTANTSTØTTE);
  }
}

export default function KSDokumentasjon() {
  return <DokumentasjonSide />;
}
