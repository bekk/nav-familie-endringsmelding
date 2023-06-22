import type { TypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { TypografiWrapper } from '~/utils/typografiWrapper';
import { SanityDokument } from '~/typer/sanity/sanity';
import { flettefeltTilTekst } from '~/utils/fletteTilTekst';
import { Link } from '@navikt/ds-react';
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
          link: props => {
            return (
              <Link
                target={props.value.blank ? '_blank' : '_self'}
                href={encodeURI(props.value.href)}
                rel="noreferrer"
              >
                {props.text}
              </Link>
            );
          },
        },
      }}
    />
  ) : null;
};

export default TekstBlokk;
