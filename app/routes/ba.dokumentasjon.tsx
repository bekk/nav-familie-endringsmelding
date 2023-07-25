import { ActionArgs } from '@remix-run/node';

import sendEndringAction from '~/server/sendEndringAction.server';
import DokumentasjonSide from '~/sider/Dokumentasjon';
import { EYtelse } from '~/typer/ytelse';

export async function action({ request }: ActionArgs) {
  return sendEndringAction(request, EYtelse.BARNETRYGD);
}

export default function BADokumentasjon() {
  return <DokumentasjonSide />;
}
