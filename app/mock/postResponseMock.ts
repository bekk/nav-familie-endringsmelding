import { RESPONSE_STATUS_OK } from '~/konstanter/sendEndringsmelding';
import { IPostResponse } from '~/typer/response';

const postResponseMock: IPostResponse = {
  text: RESPONSE_STATUS_OK,
  mottattDato: '2023-07-06T13:00:00.00000',
};

export default postResponseMock;
