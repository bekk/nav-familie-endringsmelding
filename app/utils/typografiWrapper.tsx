import { Heading } from '@navikt/ds-react';
import { TypografiTyper } from '~/typer/typografi';

export interface WrapperProps {
  typografi?: TypografiTyper;
  children?: React.ReactNode | React.ReactNode[];
}

export const TypografiWrapper: React.FC<WrapperProps> = ({
  typografi,
  children,
}: WrapperProps) => {
  switch (typografi) {
    case TypografiTyper.Liste:
      return <li>{children}</li>;

    case TypografiTyper.StegHeadingH1:
      return (
        <Heading level="1" size="xlarge">
          {children}
        </Heading>
      );

    case TypografiTyper.Bold:
      return <b>{children}</b>;

    case undefined:
      return <div>{children}</div>;
  }
};
