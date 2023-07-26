import React, { useState } from 'react';

import GodtBildeToggleLink from './GodtBildeToggleLink';
import css from './taGodtBilde.module.css';
import TaGodtBildeInnhold from './TaGodtBildeInnhold';

const TaGodtBildeInfo = () => {
  const [erÅpen, settErÅpen] = useState<boolean>(false);
  return (
    <div className={`${css.kontainer}`}>
      <GodtBildeToggleLink
        vedToggle={() => settErÅpen(!erÅpen)}
        erÅpen={erÅpen}
      />
      {erÅpen && <TaGodtBildeInnhold />}
    </div>
  );
};

export default TaGodtBildeInfo;
