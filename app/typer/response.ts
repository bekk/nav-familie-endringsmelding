import { EFritekstFeil } from './fritekstfeil';

export interface IPostResponse {
  text: string;
  status: 'OK' | 'FEILET';
  mottattDato?: string;
  feilkode?: EFritekstFeil;
}

export const RESPONSE_STATUS_OK = 'OK MOCK';
export const RESPONSE_STATUS_FEIL = 'FEILET MOCK';
