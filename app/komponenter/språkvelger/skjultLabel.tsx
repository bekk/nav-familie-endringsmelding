import { Label } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled(Label)`
  position: absolute;
  clip: rect(0 0 0 0);
`;

export interface SkjultLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const SkjultLabel: React.FC<SkjultLabelProps> = ({
  htmlFor,
  children,
}) => <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
