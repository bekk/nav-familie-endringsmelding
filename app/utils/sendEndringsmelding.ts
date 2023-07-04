import { fetchWithToken } from '~/server/authorization';

//const STI: string = '/api/send-inn/ba';
//const LOKAL_URL_BACKEND: string = 'http://localhost:8099' + STI;
//const API_URL_BACKEND: string ='https://nav-familie-endringsmelding-api.fly.dev/' + STI;
const testUrl: string = 'http://localhost:8099/api/test/hello';

export async function sendEndringsmelding(tekst: string) {
  const requestRemix = new Request(testUrl);
  /*   const bodyStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(tekst));
      controller.close();
    },
  });
  const readableStream: ReadableStream<Uint8Array> = new Blob([tekst]).stream();
  const writableStream: WritableStream<Uint8Array> =
    new WritableStream<Uint8Array>({
      write(chunk) {
        // Do something with the received chunks if needed
      },
    }); */
  const requestInfo = new Request(testUrl, {
    method: 'POST',
    body: tekst,
  });
  console.log('requestInfo Send Endringsmelding', requestInfo);
  switch (process.env.ENV) {
    //Skal være i case EMiljø.LOKAL
    default:
      return await fetchWithToken(requestRemix, testUrl, requestInfo);
    /*    case EMiljø.PRODUKSJON:
      return (await fetchWithToken(request, API_URL_BACKEND)).json(); */
    /* default:
      return Promise.resolve(søkerMock); */
  }
}
