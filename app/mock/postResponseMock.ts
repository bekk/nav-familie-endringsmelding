import { IPostResponse } from '~/typer/response';
import { RESPONSE_STATUS_OK } from '~/utils/fritekstfeltValidering';

const postResponseMock: IPostResponse = {
  text: RESPONSE_STATUS_OK,
  mottattDato: '2023-07-06T13:00:00.00000',
};

export default postResponseMock;
