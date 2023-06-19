import { TypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { TypografiWrapper } from '~/utils/typografiWrapper';

interface TekstBlokkProps {
  tekstblokk: any | undefined;
  valgBlock: string;
  typografi?: TypografiTyper;
}

const TekstBlokk: React.FC<TekstBlokkProps> = ({
  tekstblokk,
  typografi,
  valgBlock,
}: TekstBlokkProps) => {
  return tekstblokk ? (
    <PortableText
      value={tekstblokk[valgBlock]}
      components={{
        block: {
          normal: ({ children }) => (
            <TypografiWrapper typografi={typografi}>
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
