import { Alert } from '@navikt/ds-react';
import React, { useState } from 'react';

import GodtBildeToggleLink from './GodtBildeToggleLink';
import css from './utvidetInformasjon.module.css';

interface Props {
  children: React.ReactNode;
}

const UtvidetInformasjon = ({ children }: Props) => {
  const [erÅpen, settErÅpen] = useState<boolean>(false);
  return (
    <div className={`${css.utvidetInformasjonKonteiner}`}>
      <div className={`${css.godtBildeToggleLinkKonteiner}`}>
        <GodtBildeToggleLink
          vedToggle={() => settErÅpen(!erÅpen)}
          erÅpen={erÅpen}
        />
      </div>
      <div className={`${css.innholdKonteiner}`}>
        {erÅpen && (
          <div>
            <Alert variant={'info'} inline={false}>
              {children}
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtvidetInformasjon;
