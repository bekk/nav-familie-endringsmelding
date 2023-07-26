import { EAction } from '~/typer/action';
import { EYtelse } from '~/typer/ytelse';

import lastOppFilAction from './lastoppFilAction.server';
import sendEndringAction from './sendEndringAction.server';

export const håndterDokumentasjonAction = async (
  request: Request,
  ytelse: EYtelse,
) => {
  const formdata = await request.clone().formData();
  const actionType = formdata.get('_action') as EAction;

  switch (actionType) {
    case EAction.LAST_OPP_FIL:
      return await lastOppFilAction(request.clone());
    case EAction.SEND_ENDRINGER:
      return await sendEndringAction(request.clone(), ytelse);
  }
};
