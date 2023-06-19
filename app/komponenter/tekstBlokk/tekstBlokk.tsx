import type { TypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { TypografiWrapper } from '~/utils/typografiWrapper';
import { LocaleType } from '~/typer/sanity/sanity';

interface Props {
  tekstblokk: any | undefined;
  valgSpraak: LocaleType;
  typografi?: TypografiTyper;
}

const TekstBlokk: React.FC<Props> = ({
  tekstblokk,
  typografi,
  valgSpraak,
}: Props) => {
  return tekstblokk ? (
    <PortableText
      value={tekstblokk[valgSpraak]}
      components={{
        block: {
          normal: ({ children }) => (
            <TypografiWrapper typografi={typografi} style={{ margin: '0' }}>
              {children}
            </TypografiWrapper>
          ),
          h1: ({ children }) => (
            <TypografiWrapper typografi={typografi}>
              {children}
            </TypografiWrapper>
          ),
          li: ({ children }) => (
            <TypografiWrapper typografi={typografi}>
              {children}
            </TypografiWrapper>
          ),
        },
      }}
    />
  ) : null;
};

export default TekstBlokk;
