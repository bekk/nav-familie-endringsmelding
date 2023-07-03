import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { ETypografiTyper } from '~/typer/typografi';

export interface Props {
  typografi?: ETypografiTyper;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const TypografiWrapper: React.FC<Props> = ({
  typografi,
  children,
  style,
}: Props) => {
  switch (typografi) {
    case ETypografiTyper.BODY_SHORT:
      return <BodyShort style={style}>{children}</BodyShort>;

    case ETypografiTyper.HEADING_H1:
      return (
        <Heading style={style} level="1" size="xlarge">
          {children}
        </Heading>
      );
    case ETypografiTyper.STEG_HEADING_SMALL_H1:
      return (
        <Heading style={style} level="1" size="small">
          {children}
        </Heading>
      );
    case ETypografiTyper.HEADING_H2:
      return (
        <Heading style={style} level="2" size="large">
          {children}
        </Heading>
      );
    case ETypografiTyper.BANNER_HEADING:
      return (
        <Heading style={style} level="1" size="large">
          {children}
        </Heading>
      );
    case ETypografiTyper.LABEL:
      return <Label>{children}</Label>;

    default:
      return <div style={style}>{children}</div>;
  }
};
