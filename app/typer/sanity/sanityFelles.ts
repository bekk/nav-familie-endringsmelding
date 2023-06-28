import { SanityDokument } from './sanity';

export enum EApiKeysFelles {
  KNAPP_TILBAKE = 'knappTilbake',
  KNAPP_SEND_ENDRINGER = 'knappSendEndringer',
  BANNER = 'bannerTekst',
}

export type IFellesTekstinnhold = Record<EApiKeysFelles, SanityDokument>;
