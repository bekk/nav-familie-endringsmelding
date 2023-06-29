import { ISanityDokument } from './sanity';

export enum EApiKeysForside {
  TITTEL = 'tittel',
  BRUKERHILSEN = 'brukerHilsen',
  LINKTILPERSONVERNERKLAERING = 'linkTilPersonvernerklaering',
  SAMTYKKEPANEL_FEILMELDING = 'samtykkePanelFeilmelding',
  SAMTYKKEPANEL_MELDING = 'samtykkePanelMelding',
  SAMTYKKEPANEL_SAMTYKKE = 'samtykkePanelSamtykke',
  SAMTYKKEPANEL_TITTEL = 'samtykkePanelTittel',
  VEILEDERHILSENINNHOLD = 'veilederhilsenInnhold',
}

export type ForsideTekstinnhold = Record<EApiKeysForside, ISanityDokument>;
