import { ConfirmationPanel } from '@navikt/ds-react';
import { useState } from 'react';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './samtykkepanel.module.css';

interface Props {
  tittel: SanityDokument;
  innhold: SanityDokument;
  samtykke: SanityDokument;
  feilmelding: SanityDokument;
}

const SamtykkePanel: React.FC<Props> = ({
  tittel,
  innhold,
  samtykke,
  feilmelding,
}: Props) => {
  const [samtykkeErBekreftet, settSamtykkeErBekreftet] = useState(false);
  const [feilmeldingAktivert /* , settFeilmeldingAktivert */] = useState(false);

  return (
    <div className={`${css.samtykkePanelOmråde}`}>
      <TekstBlokk tekstblokk={tittel} />
      <ConfirmationPanel
        checked={samtykkeErBekreftet}
        label={<TekstBlokk tekstblokk={samtykke} />}
        onChange={() => settSamtykkeErBekreftet(harLest => !harLest)}
        error={
          !samtykkeErBekreftet &&
          feilmeldingAktivert && <TekstBlokk tekstblokk={feilmelding} />
        }
      >
        <TekstBlokk tekstblokk={innhold} />
      </ConfirmationPanel>
    </div>
  );
};

export default SamtykkePanel;
