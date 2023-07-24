import { ActionArgs } from '@remix-run/node';

import sendEndringAction from '~/server/sendEndringAction.server';
import DokumentasjonSide from '~/sider/Dokumentasjon';

export async function action({ request }: ActionArgs) {
  return sendEndringAction(request);
}

export default function KSDokumentasjon() {
  return <DokumentasjonSide />;
}
