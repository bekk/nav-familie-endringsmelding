import type { TypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { TypografiWrapper } from '~/utils/typografiWrapper';
import { LocaleType, SanityDokument } from '~/typer/sanity/sanity';

interface Props {
  tekstblokk: SanityDokument | undefined;
  typografi?: TypografiTyper;
}

const TekstBlokk: React.FC<Props> = ({ tekstblokk, typografi }: Props) => {
  const spraak: LocaleType = LocaleType.nb;

  return tekstblokk ? (
    <PortableText
      value={tekstblokk[spraak]}
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
        },
      }}
    />
  ) : null;
};

export default TekstBlokk;
