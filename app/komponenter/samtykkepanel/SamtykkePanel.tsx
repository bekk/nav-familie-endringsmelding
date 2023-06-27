import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './samtykkepanel.module.css';
import { TypografiTyper } from '~/typer/typografi';

interface Props {
  tittel: SanityDokument;
  innhold: SanityDokument;
  samtykke: SanityDokument;
  feilmelding: SanityDokument;
  vedSamtykkeEndring: (bekreftet: boolean) => void;
  feilmeldingAktivert: boolean;
}

const SamtykkePanel: React.FC<Props> = ({
  tittel,
  innhold,
  samtykke,
  feilmelding,
  vedSamtykkeEndring,
  feilmeldingAktivert,
}: Props) => {
  const [samtykkeErBekreftet, settSamtykkeErBekreftet] = useState(false);

  const håndterSamtykkeEndring = (bekreftet: boolean) => {
    settSamtykkeErBekreftet(bekreftet);
    vedSamtykkeEndring(bekreftet);
  };

  return (
    <div className={`${css.samtykkePanelOmråde}`}>
      <TekstBlokk tekstblokk={tittel} />
      <ConfirmationPanel
        checked={samtykkeErBekreftet}
        label={<TekstBlokk tekstblokk={samtykke} />}
        onChange={() => {
          håndterSamtykkeEndring(!samtykkeErBekreftet);
        }}
        error={
          !samtykkeErBekreftet &&
          feilmeldingAktivert && (
            <TekstBlokk
              tekstblokk={feilmelding}
              typografi={TypografiTyper.BodyShort}
            /> //denne gir feilmelding fordi den ikke er en ren String ("kan ikke være i <p>"). Visuelt fungerer den.
          )
        }
      >
        <TekstBlokk tekstblokk={innhold} />
      </ConfirmationPanel>
    </div>
  );
};

export default SamtykkePanel;
