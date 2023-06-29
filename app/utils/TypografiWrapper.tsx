import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { TypografiTyper } from '~/typer/typografi';

export interface Props {
  typografi?: TypografiTyper;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
}

export const TypografiWrapper: React.FC<Props> = ({
  typografi,
  children,
  style,
}: Props) => {
  switch (typografi) {
    case TypografiTyper.BodyShort:
      return <BodyShort style={style}>{children}</BodyShort>;

    case TypografiTyper.StegHeadingH1:
      return (
        <Heading style={style} level="1" size="xlarge">
          {children}
        </Heading>
      );
    case TypografiTyper.StegHeadingSmallH1:
      return (
        <Heading style={style} level="1" size="small">
          {children}
        </Heading>
      );
    case TypografiTyper.HeadingH2:
      return (
        <Heading style={style} level="2" size="large">
          {children}
        </Heading>
      );
    case TypografiTyper.BannerHeading:
      return (
        <Heading style={style} level="2" size="large">
          {children}
        </Heading>
      );
    case TypografiTyper.Label:
      return <Label>{children}</Label>;

    default:
      return <div style={style}>{children}</div>;
  }
};
