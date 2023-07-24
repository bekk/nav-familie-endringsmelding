import { ChevronDownIcon, ChevronUpIcon, GlobeIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';
import { Button, Wrapper } from 'react-aria-menubutton';
import styled from 'styled-components';

import { useSpråk } from '~/hooks/contextHooks';
import { ELocaleType } from '~/typer/felles';

import { SkjultLabel } from './skjultLabel';
import { SpråkMenu } from './språkMenu';

const StyledWrapper = styled(Wrapper)`
  position: relative;
  outline: none;
`;

const StyledButton = styled(Button)`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  outline: none;
  border-radius: 0.25rem;
  border: 3px solid var(--a-gray-400);

  &:focus {
    border: solid 3px var(--a-blue-800);
  }
`;

const StyledNormalTekst = styled(BodyShort)`
  padding: 0 1.22rem;
  flex-grow: 1;
`;

const StyledCollapse = styled(ChevronUpIcon)`
  z-index: -1;
`;

const StyledExpand = styled(ChevronDownIcon)`
  z-index: -1;
`;

export const hentSprakvelgerLabelTekst = (locale: ELocaleType) => {
  switch (locale) {
    case ELocaleType.EN:
      return 'Language selection';
    case ELocaleType.NN:
      return 'Språkval';
    default:
      return 'Språkvalg';
  }
};

export const sprakTittel: Record<ELocaleType, string> = {
  [ELocaleType.EN]: 'English',
  [ELocaleType.NB]: 'Bokmål',
  [ELocaleType.NN]: 'Nynorsk',
};

interface Props {
  className?: string;
}
export const Språkvelger: React.FC<Props> = ({ className }) => {
  const [språk, settSpråk] = useSpråk();
  const [erÅpen, setErÅpen] = React.useState<any>(false);

  const handleSelection = (value: JSX.Element) => {
    const valgtSprak = ELocaleType.NB;
    if (valgtSprak) {
      settSpråk(valgtSprak);
    }
  };
  return (
    <StyledWrapper
      onSelection={(value: JSX.Element) => handleSelection(value)}
      onMenuToggle={(wrapperState: { isOpen: any }) =>
        setErÅpen(wrapperState.isOpen)
      }
      className={className}
    >
      <SkjultLabel htmlFor="språkvelger">
        {hentSprakvelgerLabelTekst(språk)}
      </SkjultLabel>
      <StyledButton id="språkvelger" value={språk}>
        <GlobeIcon
          role="img"
          focusable={false}
          aria-hidden={true}
          onResize={undefined}
          onResizeCapture={undefined}
        />
        <StyledNormalTekst size={'small'}>
          {sprakTittel[språk as ELocaleType]}
        </StyledNormalTekst>
        {erÅpen ? (
          <StyledCollapse
            role="img"
            focusable={false}
            aria-hidden={true}
            onResize={undefined}
            onResizeCapture={undefined}
          />
        ) : (
          <StyledExpand
            role="img"
            focusable={false}
            aria-hidden={true}
            onResize={undefined}
            onResizeCapture={undefined}
          />
        )}
      </StyledButton>
      <SpråkMenu
        valgtLocale={språk}
        støttedeSprak={[ELocaleType.NB, ELocaleType.NN, ELocaleType.EN]}
      />
    </StyledWrapper>
  );
};
/* 
const Label = () => {
  return (
    <span className={`${css.label}`}>
      <GlobeIcon title="globe-icon" fontSize={'1.5rem'} />
      <span> Språk/language </span>
    </span>
  );
}; */
