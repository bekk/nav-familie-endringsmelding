import {
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';

import { getSession } from '~/sessions';

import lastOppFil from './lastoppFil.server';

export default async function lastOppFilAction(request: Request) {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 1_000_000 * 21, // 21 MB
  });
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );
  return await lastOppFil(
    formData,
    await getSession(request.headers.get('Cookie')),
  );
}
