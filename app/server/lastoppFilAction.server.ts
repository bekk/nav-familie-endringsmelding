import {
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';

import { getSession } from '~/sessions';

import lastOppFil from './lastoppFil.server';

export default async function lastOppFilAction(request: Request) {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 500_000,
  });
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );
  const fil = formData.get('file') as File;

  return await lastOppFil(fil, await getSession(request.headers.get('Cookie')));
}
