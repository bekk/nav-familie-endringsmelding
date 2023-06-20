import type { TypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { TypografiWrapper } from '~/utils/typografiWrapper';
import { SanityDokument } from '~/typer/sanity/sanity';
import { useSpråk } from '~/root';

interface Props {
  tekstblokk: SanityDokument | undefined;
  typografi?: TypografiTyper;
}

const TekstBlokk: React.FC<Props> = ({ tekstblokk, typografi }: Props) => {
  const [språk] = useSpråk();

  return tekstblokk ? (
    <PortableText
      value={tekstblokk[språk]}
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
        marks: {
          link: props => {
            return (
              <a
                target={props.value.blank ? '_blank' : '_self'}
                href={encodeURI(props.value.href)}
                rel="noreferrer"
              >
                {props.text}
              </a>
            );
          },
        },
      }}
    />
  ) : null;
};

export default TekstBlokk;
