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
    <div className={`${css.samtykkePanelOmråde}`}>
      <TekstBlokk
        tekstblokk={tekster.samtykkePanelTittel}
        typografi={ETypografiTyper.LABEL}
      />
      <ConfirmationPanel
        checked={erSamtykkeBekreftet}
        label={<TekstBlokk tekstblokk={tekster.samtykkePanelSamtykke} />}
        onChange={() => {
          vedSamtykkeEndring(!erSamtykkeBekreftet);
        }}
        data-testid="samtykkepanel"
        error={
          !erSamtykkeBekreftet &&
          feilmeldingAktivert && (
            <span data-testid="samtykkepanelFeilmelding">
              <TekstBlokk
                tekstblokk={tekster.samtykkePanelFeilmelding}
                typografi={ETypografiTyper.BODY_SHORT}
              />
              {/*denne gir feilmelding fordi den ikke er en ren String ("kan ikke være i <p>"). Visuelt fungerer den.*/}
            </span>
          )
        }
      >
        <TekstBlokk tekstblokk={tekster.samtykkePanelMelding} />
      </ConfirmationPanel>
    </div>
  );
};

export default SamtykkePanel;
