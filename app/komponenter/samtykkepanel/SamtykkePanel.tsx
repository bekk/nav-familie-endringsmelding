import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { IForsideTekstinnhold } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './samtykkepanel.module.css';
import { TypografiTyper } from '~/typer/typografi';

interface Props {
  tekster: IForsideTekstinnhold;
  vedSamtykkeEndring: (bekreftet: boolean) => void;
  feilmeldingAktivert: boolean;
}

const SamtykkePanel: React.FC<Props> = ({
  tekster,
  vedSamtykkeEndring,
  feilmeldingAktivert,
}: Props) => {
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);

  const håndterSamtykkeEndring = (bekreftet: boolean) => {
    settErSamtykkeBekreftet(bekreftet);
    vedSamtykkeEndring(bekreftet);
  };

  return (
    <div className={`${css.samtykkePanelOmråde}`}>
      <TekstBlokk tekstblokk={tekster.samtykkePanelTittel} />
      <ConfirmationPanel
        checked={erSamtykkeBekreftet}
        label={<TekstBlokk tekstblokk={tekster.samtykkePanelSamtykke} />}
        onChange={() => {
          håndterSamtykkeEndring(!erSamtykkeBekreftet);
        }}
        error={
          !erSamtykkeBekreftet &&
          feilmeldingAktivert && (
            <TekstBlokk
              tekstblokk={tekster.samtykkePanelFeilmelding}
              typografi={TypografiTyper.BodyShort}
            /> //denne gir feilmelding fordi den ikke er en ren String ("kan ikke være i <p>"). Visuelt fungerer den.
          )
        }
      >
        <TekstBlokk tekstblokk={tekster.samtykkePanelMelding} />
      </ConfirmationPanel>
    </div>
  );
};

export default SamtykkePanel;
