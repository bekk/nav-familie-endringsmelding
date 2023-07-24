import { ActionArgs } from '@remix-run/node';

import sendEndringAction from '~/server/sendEndringAction.server';
import SendEndringSide from '~/sider/SendEndring';
import { EYtelse } from '~/typer/ytelse';

export async function action({ request }: ActionArgs) {
  return sendEndringAction(request, EYtelse.KONTANTSTØTTE);
}

export default function KSEndringsmelding() {
  return <SendEndringSide />;
}
