import { ActionArgs } from '@remix-run/node';

import lastOppFilAction from '~/server/lastoppFilAction.server';
import DokumentasjonSide from '~/sider/Dokumentasjon';

export async function action({ request }: ActionArgs) {
  return await lastOppFilAction(request);
}

export default function BADokumentasjon() {
  return <DokumentasjonSide />;
}
