import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { ForsideTekstinnhold } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './samtykkepanel.module.css';
import { ETypografiTyper } from '~/typer/typografi';

interface IProps {
  tekster: ForsideTekstinnhold;
  håndterSamtykkeEndring: (bekreftet: boolean) => void;
  feilmeldingAktivert: boolean;
}

const SamtykkePanel: React.FC<IProps> = ({
  tekster,
  håndterSamtykkeEndring,
  feilmeldingAktivert,
}: IProps) => {
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
              typografi={ETypografiTyper.BodyShort}
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
