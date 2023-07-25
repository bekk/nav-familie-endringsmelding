import React from 'react';

import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';

import TekstBlokk from '../tekstblokk/TekstBlokk';
import BildeScanningEksempel from './BildeScanningEksempel';
import css from './bildeScanningGuide.module.css';
import ScanningIkon from './ScanningIkon';
import UtvidetInformasjon from './UtvidetInformasjon';

const BildeScanningGuide = () => {
  const tekster = useTekster(ESanityMappe.DOKUMENTASJON);
  const svgIkonHøyde = 100;
  return (
    <UtvidetInformasjon>
      <div>
        <TekstBlokk tekstblokk={tekster.slikTarDuEtGodtBilde} />
        <TekstBlokk tekstblokk={tekster.etterDuHarTattBilde} />
        <div>
          <TekstBlokk tekstblokk={tekster.braOgDaarligTittel} />
          <div className={`${css.eksempelBilderWrapper}`}>
            <div className={`${css.bildeEksempelKonteiner}`}>
              <BildeScanningEksempel
                bilde={<ScanningIkon status="good" height={svgIkonHøyde} />}
                status="suksess"
                statusTekst={<TekstBlokk tekstblokk={tekster.braBilde} />}
                beskrivelse={
                  <TekstBlokk tekstblokk={tekster.fyllerHeleSiden} />
                }
              />
            </div>
            <div className={`${css.bildeEksempelKonteiner}`}>
              <BildeScanningEksempel
                bilde={<ScanningIkon status="keystone" height={svgIkonHøyde} />}
                status="feil"
                statusTekst={<TekstBlokk tekstblokk={tekster.daarligBilde} />}
                beskrivelse={
                  <TekstBlokk tekstblokk={tekster.bildeIkkeTattOvenfra} />
                }
              />
            </div>
            <div className={`${css.bildeEksempelKonteiner}`}>
              <BildeScanningEksempel
                bilde={
                  <ScanningIkon status="horizontal" height={svgIkonHøyde} />
                }
                status="feil"
                statusTekst={<TekstBlokk tekstblokk={tekster.daarligBilde} />}
                beskrivelse={
                  <TekstBlokk tekstblokk={tekster.bildeIkkeRiktigRetning} />
                }
              />
            </div>
            <div className={`${css.bildeEksempelKonteiner}`}>
              <BildeScanningEksempel
                bilde={<ScanningIkon status="shadow" height={svgIkonHøyde} />}
                status="feil"
                statusTekst={<TekstBlokk tekstblokk={tekster.daarligBilde} />}
                beskrivelse={<TekstBlokk tekstblokk={tekster.bildeHarSkygge} />}
              />
            </div>
          </div>
          <TekstBlokk tekstblokk={tekster.merHjelpLenke} />
        </div>
      </div>
    </UtvidetInformasjon>
  );
};
export default BildeScanningGuide;
