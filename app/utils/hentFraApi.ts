import søkerMock from '~/mock/søkerMock';

export const hentSøkerFornavn = () => {
  const søker = søkerMock;
  //her skal vi fetche fra API
  let fornavn: string = søker.visningsnavn.trim();
  try {
    fornavn = fornavn.split(' ')[0];
  } catch (e: unknown) {
    console.log('❌ kunne ikke hente brukers navn: ', { e });
    fornavn = 'Du!';
  }
  return fornavn;
};
