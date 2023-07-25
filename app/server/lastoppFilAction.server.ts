import { getSession } from '~/sessions';

import lastOppFil from './lastoppFil.server';

export default async function lastOppFilAction(request: Request) {
  const formatData = await request.formData();
  const fil = formatData.get('fileInput') as File;
  console.log('Fil i action: ', fil);

  return await lastOppFil(fil, await getSession(request.headers.get('Cookie')));
}
