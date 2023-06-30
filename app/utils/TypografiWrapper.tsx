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
    case ETypografiTyper.BodyShort:
      return <BodyShort style={style}>{children}</BodyShort>;

    case ETypografiTyper.HeadingH1:
      return (
        <Heading style={style} level="1" size="xlarge">
          {children}
        </Heading>
      );
    case ETypografiTyper.StegHeadingSmallH1:
      return (
        <Heading style={style} level="1" size="small">
          {children}
        </Heading>
      );
    case ETypografiTyper.HeadingH2:
      return (
        <Heading style={style} level="2" size="large">
          {children}
        </Heading>
      );
    case ETypografiTyper.BannerHeading:
      return (
        <Heading style={style} level="1" size="large">
          {children}
        </Heading>
      );
    case ETypografiTyper.Label:
      return <Label>{children}</Label>;

    default:
      return <div style={style}>{children}</div>;
  }
};
