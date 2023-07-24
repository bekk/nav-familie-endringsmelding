import { BodyShort } from '@navikt/ds-react';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'react-aria-menubutton';
import styled from 'styled-components';

import { ELocaleType } from '~/typer/felles';

import { sprakTittel } from './språkvelger';

const StyledListe = styled.ul`
  padding-left: 0;
  position: absolute;
  width: 100%;
  z-index: 100;
  margin-top: 0;

  :hover,
  :focus {
    outline: none;
  }

  li {
    list-style: none;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid var(--a-gray-300);
  border-left: 1px solid var(--a-gray-300);
  border-right: 1px solid var(--a-gray-300);

  :hover,
  :focus {
    outline: none;
    background-color: var(--a-blue-500);
    color: #fff;
  }

  :hover {
    cursor: pointer;
  }
`;

export const SelectMenuItem: FC<{ locale: ELocaleType }> = ({ locale }) => {
  return (
    <li value={locale}>
      <StyledMenuItem>
        <BodyShort size={'small'} key={locale}>
          {sprakTittel[locale]}
        </BodyShort>
      </StyledMenuItem>
    </li>
  );
};

export const SpråkMenu: FC<{
  støttedeSprak: ELocaleType[];
  valgtLocale: ELocaleType;
}> = ({ støttedeSprak, valgtLocale }) => {
  return (
    <Menu>
      <StyledListe>
        {støttedeSprak.map(locale => {
          return (
            locale !== valgtLocale && (
              <SelectMenuItem key={locale} locale={locale} />
            )
          );
        })}
      </StyledListe>
    </Menu>
  );
};
