import { BodyShort, Heading } from '@navikt/ds-react';
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
    case TypografiTyper.StegHeadingH2:
      return (
        <Heading style={style} level="2" size="xlarge">
          {children}
        </Heading>
      );
    case TypografiTyper.BannerHeading:
      return (
        <Heading style={style} level="2" size="large">
          {children}
        </Heading>
      );

    default:
      return <div style={style}>{children}</div>;
  }
};
