import { ISanityDokument } from './sanity';

export enum EApiKeysFelles {
  KNAPP_TILBAKE = 'knappTilbake',
  KNAPP_SEND_ENDRINGER = 'knappSendEndringer',
  BANNER = 'bannerTekst',
}

export type FellesTekstinnhold = Record<EApiKeysFelles, ISanityDokument>;
