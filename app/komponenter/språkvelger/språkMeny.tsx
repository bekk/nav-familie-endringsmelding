import { BodyShort } from '@navikt/ds-react';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'react-aria-menubutton';

import { ELocaleType } from '~/typer/felles';
import { språkTittel, støttedeSpråk } from '~/utils/språk';

import css from './språkMeny.module.css';

export const ListeElement: FC<{ språk: ELocaleType }> = ({ språk }) => {
  return (
    <li value={språk}>
      <MenuItem className={`${css.menyElement}`} data-testid={språk}>
        <BodyShort size={'small'} key={språk}>
          {språkTittel[språk]}
        </BodyShort>
      </MenuItem>
    </li>
  );
};

export const SpråkMeny: FC<{
  valgtSpråk: ELocaleType;
}> = ({ valgtSpråk }) => {
  return (
    <Menu>
      <ul className={`${css.språkListe}`}>
        {støttedeSpråk.map(språk => {
          return (
            språk !== valgtSpråk && <ListeElement key={språk} språk={språk} />
          );
        })}
      </ul>
    </Menu>
  );
};
