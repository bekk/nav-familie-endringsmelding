import { ChevronDownIcon, ChevronUpIcon, GlobeIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';
import { Button, Wrapper } from 'react-aria-menubutton';

import { useSpråk } from '~/hooks/contextHooks';
import { ELocaleType } from '~/typer/felles';
import { språkTittel, støttedeSpråk } from '~/utils/språk';

import { SpråkMeny } from './språkMeny';
import css from './språkvelger.module.css';

export const Språkvelger: React.FC = () => {
  const [språk, settSpråk] = useSpråk();
  const [erÅpen, settErÅpen] = useState<boolean>(false);

  const håndterSpråkvalg = (valg: JSX.Element) => {
    const valgtSpråk = støttedeSpråk.find(språk => språk === valg.key);
    if (valgtSpråk) {
      settSpråk(valgtSpråk);
    }
  };
  return (
    <Wrapper
      onSelection={(valg: JSX.Element) => håndterSpråkvalg(valg)}
      onMenuToggle={(wrapperState: { isOpen: boolean }) =>
        settErÅpen(wrapperState.isOpen)
      }
      className={`${css.språkvelgerWrapper}`}
    >
      <Button
        id="språkvelger"
        value={språk}
        className={`${css.språkvelgerKnapp}`}
      >
        <GlobeIcon />
        <BodyShort size={'small'} className={`${css.valgtSpråk}`}>
          {språkTittel[språk as ELocaleType]}
        </BodyShort>
        {erÅpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      <SpråkMeny valgtSpråk={språk} />
    </Wrapper>
  );
};
