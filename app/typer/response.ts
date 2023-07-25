import { EFritekstFeil } from './fritekstfeil';

export interface IPostResponse {
  status: EStatusKode;
  data?: IResponseData;
  feilKode?: EFritekstFeil;
}

export interface IResponseData {
  mottattDato: string;
}

export enum EStatusKode {
  OK = 'OK',
  FEILET = 'FEILET',
}

export enum EStatusKodeMock {
  OK = 'OK MOCK',
  FEILET = 'FEILET MOCK',
}
