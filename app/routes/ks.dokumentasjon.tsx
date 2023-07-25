import { ActionArgs } from '@remix-run/node';

import lastOppFilAction from '~/server/lastoppFilAction.server';
import DokumentasjonSide from '~/sider/Dokumentasjon';

export async function action({ request }: ActionArgs) {
  return lastOppFilAction(request);
}

export default function KSDokumentasjon() {
  return <DokumentasjonSide />;
}
