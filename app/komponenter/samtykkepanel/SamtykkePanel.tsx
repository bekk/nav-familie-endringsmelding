import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './samtykkepanel.module.css';
import { TypografiTyper } from '~/typer/typografi';
import { IForsideTekstinnhold } from '~/typer/sanity/sanityForside';

interface Props {
  tekster: IForsideTekstinnhold;
  håndterSamtykkeEndring: (bekreftet: boolean) => void;
  feilmeldingAktivert: boolean;
}

const SamtykkePanel: React.FC<Props> = ({
  tekster,
  håndterSamtykkeEndring,
  feilmeldingAktivert,
}: Props) => {
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);

  const {
    samtykkePanelTittel,
    samtykkePanelSamtykke,
    samtykkePanelFeilmelding,
    samtykkePanelMelding,
  } = tekster;

  const vedSamtykkeEndring = (bekreftet: boolean) => {
    settErSamtykkeBekreftet(bekreftet);
    håndterSamtykkeEndring(bekreftet);
  };

  return (
    <div className={`${css.samtykkePanelOmråde}`}>
      <TekstBlokk tekstblokk={samtykkePanelTittel} />
      <ConfirmationPanel
        checked={erSamtykkeBekreftet}
        label={<TekstBlokk tekstblokk={samtykkePanelSamtykke} />}
        onChange={() => {
          vedSamtykkeEndring(!erSamtykkeBekreftet);
        }}
        error={
          !erSamtykkeBekreftet &&
          feilmeldingAktivert && (
            <TekstBlokk
              tekstblokk={samtykkePanelFeilmelding}
              typografi={TypografiTyper.BodyShort}
            /> //denne gir feilmelding fordi den ikke er en ren String ("kan ikke være i <p>"). Visuelt fungerer den.
          )
        }
      >
        <TekstBlokk tekstblokk={samtykkePanelMelding} />
      </ConfirmationPanel>
    </div>
  );
};

export default SamtykkePanel;
