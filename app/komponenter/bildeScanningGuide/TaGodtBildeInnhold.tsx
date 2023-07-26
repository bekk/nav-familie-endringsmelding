import { Alert } from '@navikt/ds-react';
import React from 'react';

import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';

import TekstBlokk from '../tekstblokk/TekstBlokk';
import BildeScanningEksempel from './BildeScanningEksempel';
import ScanningIkon from './ScanningIkon';
import css from './taGodtBildeInnhold.module.css';

const TaGodtBildeInnhold = () => {
  const tekster = useTekster(ESanityMappe.DOKUMENTASJON);

  return (
    <Alert variant="info">
      <TekstBlokk tekstblokk={tekster.slikTarDuEtGodtBilde} />
      <TekstBlokk tekstblokk={tekster.etterDuHarTattBilde} />
      <TekstBlokk tekstblokk={tekster.braOgDaarligTittel} />
      <div className={`${css.eksempelBilderWrapper}`}>
        <BildeScanningEksempel
          bilde={<ScanningIkon status="good" />}
          status="suksess"
          statusTekst={<TekstBlokk tekstblokk={tekster.braBilde} />}
          beskrivelse={<TekstBlokk tekstblokk={tekster.fyllerHeleSiden} />}
        />
        <BildeScanningEksempel
          bilde={<ScanningIkon status="keystone" />}
          status="feil"
          statusTekst={<TekstBlokk tekstblokk={tekster.daarligBilde} />}
          beskrivelse={<TekstBlokk tekstblokk={tekster.bildeIkkeTattOvenfra} />}
        />
        <BildeScanningEksempel
          bilde={<ScanningIkon status="horizontal" />}
          status="feil"
          statusTekst={<TekstBlokk tekstblokk={tekster.daarligBilde} />}
          beskrivelse={
            <TekstBlokk tekstblokk={tekster.bildeIkkeRiktigRetning} />
          }
        />
        <BildeScanningEksempel
          bilde={<ScanningIkon status="shadow" />}
          status="feil"
          statusTekst={<TekstBlokk tekstblokk={tekster.daarligBilde} />}
          beskrivelse={<TekstBlokk tekstblokk={tekster.bildeHarSkygge} />}
        />
      </div>
      <TekstBlokk tekstblokk={tekster.merHjelpLenke} />
    </Alert>
  );
};
export default TaGodtBildeInnhold;
