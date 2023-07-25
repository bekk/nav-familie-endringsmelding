export default async function lastOppFilAction(request: Request) {
  console.log('ACTION KALT');
  const formatData = await request.formData();
  console.log('Formdata: ', formatData);
  const fil = formatData.get('fileInput') as File;

  console.log('Fil i action: ', fil);

  //return await lastOppFil(fil[0], await getSession(request.headers.get('Cookie')))
  return null;
}
