import { ActionArgs } from '@remix-run/node';

import DokumentasjonSide from '~/sider/Dokumentasjon';

export async function action({ request }: ActionArgs) {
  // await unstable_parseMultipartFormData(request, lastOppFil);
}

export default function BADokumentasjon() {
  return <DokumentasjonSide />;
}
