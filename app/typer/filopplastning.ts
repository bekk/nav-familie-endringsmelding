import { EStatusKode } from './response';

export interface IPostFilResponse {
  status: EStatusKode;
  response?: IFil;
}

export interface IFil {
  dokumentId: string;
  filnavn: string;
}
