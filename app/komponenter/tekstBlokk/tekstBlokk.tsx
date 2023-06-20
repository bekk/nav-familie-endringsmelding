import type { TypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { TypografiWrapper } from '~/utils/typografiWrapper';
import { LocaleType, SanityDokument } from '~/typer/sanity/sanity';
import { flettefeltTilTekst } from '~/utils/fletteTilTekst';

interface Props {
  tekstblokk: SanityDokument | undefined;
  typografi?: TypografiTyper;
  flettefelter?: TypografiTyper;
}

const TekstBlokk: React.FC<Props> = ({
  tekstblokk,
  typografi,
  flettefelter,
}: Props) => {
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
          h2: ({ children }) => (
            <TypografiWrapper typografi={typografi}>
              {children}
            </TypografiWrapper>
          ),
        },
        marks: {
          flettefelt: props => {
            if (props?.value?.flettefeltVerdi) {
              return (
                <span>{flettefeltTilTekst(props?.value?.flettefeltVerdi)}</span>
              );
            } else {
              throw new Error(`Fant ikke flettefeltVerdi`);
            }
          },
        },
      }}
    />
  ) : null;
};

export default TekstBlokk;
