import { ISanityDokument } from './sanity';

export enum EApiKeysFelles {
  KNAPP_TILBAKE = 'knappTilbake',
  KNAPP_SEND_ENDRINGER = 'knappSendEndringer',
  BANNER = 'bannerTekst',
  KNAPP_START = 'knappStart',
  KNAPP_NESTE = 'knappNeste',
}

export type FellesTekstinnhold = Record<EApiKeysFelles, ISanityDokument>;
