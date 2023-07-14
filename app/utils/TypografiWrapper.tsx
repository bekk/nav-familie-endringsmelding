import { BodyShort, Heading, Label } from '@navikt/ds-react';

import { ETypografiTyper } from '~/typer/typografi';

export interface Props {
  typografi?: ETypografiTyper;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  dataTestid?: string;
}

export const TypografiWrapper: React.FC<Props> = ({
  typografi,
  children,
  style,
  dataTestid,
}: Props) => {
  switch (typografi) {
    case ETypografiTyper.BODY_SHORT:
      return (
        <BodyShort style={style} data-testid={dataTestid}>
          {children}
        </BodyShort>
      );

    case ETypografiTyper.HEADING_H1:
      return (
        <Heading style={style} level="1" size="xlarge" data-testid={dataTestid}>
          {children}
        </Heading>
      );
    case ETypografiTyper.STEG_HEADING_SMALL_H1:
      return (
        <Heading style={style} level="1" size="small" data-testid={dataTestid}>
          {children}
        </Heading>
      );
    case ETypografiTyper.HEADING_H2:
      return (
        <Heading style={style} level="2" size="large" data-testid={dataTestid}>
          {children}
        </Heading>
      );
    case ETypografiTyper.BANNER_HEADING:
      return (
        <Heading style={style} level="1" size="large" data-testid={dataTestid}>
          {children}
        </Heading>
      );
    case ETypografiTyper.LABEL:
      return (
        <Label data-testid={dataTestid} style={style}>
          {children}
        </Label>
      );

    case ETypografiTyper.SPAN:
      return <span style={style}>{children}</span>;

    default:
      return (
        <div style={style} data-testid={dataTestid}>
          {children}
        </div>
      );
  }
};
