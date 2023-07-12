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
      activeStep={nåværendeSteg}
      interactive={false}
      orientation="horizontal"
    >
      {[...Array(ANTALL_STEG)].map((_, stegIndex) => {
        const stegErGjennomført =
          stegIndex < nåværendeSteg - 1 || nåværendeSteg === ANTALL_STEG;
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
