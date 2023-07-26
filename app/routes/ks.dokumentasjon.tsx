import { ActionArgs } from '@remix-run/node';

import { håndterDokumentasjonAction } from '~/server/håndterActionDokumentasjon';
import DokumentasjonSide from '~/sider/Dokumentasjon';
import { EYtelse } from '~/typer/ytelse';

export async function action({ request }: ActionArgs) {
  return await håndterDokumentasjonAction(request, EYtelse.KONTANTSTØTTE);
}

export default function KSDokumentasjon() {
  return <DokumentasjonSide />;
}
