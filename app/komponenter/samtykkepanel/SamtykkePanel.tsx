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
  onSamtykkeEndring: (bekreftet: boolean) => void;
  feilmeldingAktivert: boolean;
}

const SamtykkePanel: React.FC<Props> = ({
  tittel,
  innhold,
  samtykke,
  feilmelding,
  onSamtykkeEndring,
  feilmeldingAktivert,
}: Props) => {
  const [samtykkeErBekreftet, settSamtykkeErBekreftet] = useState(false);

  const håndtereSamtykkeEndring = (bekreftet: boolean) => {
    settSamtykkeErBekreftet(bekreftet);
    onSamtykkeEndring(bekreftet);
  };

  return (
    <div className={`${css.samtykkePanelOmråde}`}>
      <TekstBlokk tekstblokk={tittel} />
      <ConfirmationPanel
        checked={samtykkeErBekreftet}
        label={<TekstBlokk tekstblokk={samtykke} />}
        onChange={() => {
          håndtereSamtykkeEndring(!samtykkeErBekreftet);
        }}
        error={
          !samtykkeErBekreftet &&
          feilmeldingAktivert && (
            <TekstBlokk
              tekstblokk={feilmelding}
              typografi={TypografiTyper.BodyShort}
            /> //må være String? funker med "test"
          )
        }
      >
        <TekstBlokk tekstblokk={innhold} />
      </ConfirmationPanel>
    </div>
  );
};

export default SamtykkePanel;
