import { BodyShort, Heading } from '@navikt/ds-react';
import { ETypografiTyper } from '~/typer/typografi';

export interface IProps {
  typografi?: ETypografiTyper;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const TypografiWrapper: React.FC<IProps> = ({
  typografi,
  children,
  style,
}: IProps) => {
  switch (typografi) {
    case ETypografiTyper.BodyShort:
      return <BodyShort style={style}>{children}</BodyShort>;

    case ETypografiTyper.StegHeadingH1:
      return (
        <Heading style={style} level="1" size="xlarge">
          {children}
        </Heading>
      );
    case ETypografiTyper.StegHeadingH2:
      return (
        <Heading style={style} level="2" size="xlarge">
          {children}
        </Heading>
      );

    default:
      return <div style={style}>{children}</div>;
  }
};
