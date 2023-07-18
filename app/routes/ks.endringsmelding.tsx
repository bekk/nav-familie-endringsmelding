import { ActionArgs } from '@remix-run/node';

import sendEndringAction from '~/server/sendEndringAction.server';
import SendEndringSide from '~/sider/SendEndring';

export async function action({ request }: ActionArgs) {
  return sendEndringAction(request);
}

export default function KSEndringsmelding() {
  return <SendEndringSide />;
}
