import { Stepper } from '@navikt/ds-react';

import css from './StegIndikator.module.css';

interface Props {
  nåværendeSteg: number;
}

const StegIndikator: React.FC<Props> = ({ nåværendeSteg }) => {
  const ANTALL_STEG = 3;
  const sisteSteg = nåværendeSteg === ANTALL_STEG;

  return (
    <Stepper
      className={`${css.stegIndikator}`}
      activeStep={nåværendeSteg}
      interactive={false}
      orientation="horizontal"
    >
      {[...Array(ANTALL_STEG)].map((_, stegIndex) => {
        const stegErGjennomført = stegIndex + 1 < nåværendeSteg;
        return (
          <Stepper.Step
            completed={stegErGjennomført || sisteSteg}
            key={stegIndex}
          >
            {' '}
          </Stepper.Step>
        );
      })}
    </Stepper>
  );
};

export default StegIndikator;
