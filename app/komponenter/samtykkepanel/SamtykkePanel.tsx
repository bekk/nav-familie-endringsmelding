import { ConfirmationPanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './samtykkepanel.module.css';
import { useBekreftetSamtykke, useTekster } from '~/hooks/contextHooks';
import { ETypografiTyper } from '~/typer/typografi';
import { ESanityMappe } from '~/typer/felles';

interface Props {
  håndterSamtykkeEndring: () => void;
  feilmeldingAktivert: boolean;
}

const SamtykkePanel: React.FC<Props> = ({
  håndterSamtykkeEndring,
  feilmeldingAktivert,
}: Props) => {
  const tekster = useTekster(ESanityMappe.FORSIDE);
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useBekreftetSamtykke();

  const vedSamtykkeEndring = (bekreftet: boolean) => {
    settErSamtykkeBekreftet(bekreftet);
    håndterSamtykkeEndring();
  };

  return (
    <div className={`${css.flexKolonneMedGap}`}>
      <TekstBlokk
        tekstblokk={tekster.samtykkePanelTittel}
        typografi={ETypografiTyper.LABEL}
      />
      <ConfirmationPanel
        checked={erSamtykkeBekreftet}
        label={
          <TekstBlokk
            tekstblokk={tekster.samtykkePanelSamtykke}
            typografi={ETypografiTyper.SPAN}
          />
        }
        onChange={() => {
          vedSamtykkeEndring(!erSamtykkeBekreftet);
        }}
        data-testid="samtykkepanel"
        error={
          !erSamtykkeBekreftet &&
          feilmeldingAktivert && (
            <TekstBlokk
              tekstblokk={tekster.samtykkePanelFeilmelding}
              dataTestid="samtykkepanelFeilmelding"
              typografi={ETypografiTyper.LABEL}
            />
          )
        }
      >
        <TekstBlokk tekstblokk={tekster.samtykkePanelMelding} />
      </ConfirmationPanel>
    </div>
  );
};

export default SamtykkePanel;
