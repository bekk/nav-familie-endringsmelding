import { Stepper } from '@navikt/ds-react';

import css from './StegIndikator.module.css';

interface Props {
  nåværendeSteg: number;
}

const StegIndikator: React.FC<Props> = ({ nåværendeSteg }) => {
  const ANTALL_STEG = 2;
  return (
    <Stepper
      className={`${css.stegIndikator}`}
      aria-labelledby="stepper-heading"
      activeStep={nåværendeSteg}
      orientation="horizontal"
    >
      {[...Array(ANTALL_STEG)].map((_, stegIndex) => {
        const stegErGjennomført: boolean = stegIndex < nåværendeSteg - 1;
        return (
          <Stepper.Step completed={stegErGjennomført} key={stegIndex}>
            {' '}
          </Stepper.Step>
        );
      })}
    </Stepper>
  );
};

export default StegIndikator;
