import { Heading } from '@navikt/ds-react';
import { TypografiTyper } from '~/typer/typografi';

export interface WrapperProps {
  typografi?: TypografiTyper;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
}

export const TypografiWrapper: React.FC<WrapperProps> = ({
  typografi,
  children,
  style,
}: WrapperProps) => {
  switch (typografi) {
    case TypografiTyper.Liste:
      return <li>{children}</li>;

    case TypografiTyper.Normal:
      return <p style={style}>{children}</p>;

    case TypografiTyper.StegHeadingH1:
      return (
        <Heading style={style} level="1" size="xlarge">
          {children}
        </Heading>
      );

    case TypografiTyper.Bold:
      return <b style={style}>{children}</b>;

    case undefined:
      return <div style={style}>{children}</div>;

    default:
      return <div>{children}</div>;
  }
};
