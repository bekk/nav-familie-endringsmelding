import { SanityDokument } from './sanity';

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

export interface IForsideTekstinnhold {
  [EApiKeysForside.TITTEL]: SanityDokument;
  [EApiKeysForside.BRUKERHILSEN]: SanityDokument;
  [EApiKeysForside.LINKTILPERSONVERNERKLAERING]: SanityDokument;
  [EApiKeysForside.SAMTYKKEPANEL_FEILMELDING]: SanityDokument;
  [EApiKeysForside.SAMTYKKEPANEL_MELDING]: SanityDokument;
  [EApiKeysForside.SAMTYKKEPANEL_SAMTYKKE]: SanityDokument;
  [EApiKeysForside.SAMTYKKEPANEL_TITTEL]: SanityDokument;
  [EApiKeysForside.VEILEDERHILSENINNHOLD]: SanityDokument;
}
