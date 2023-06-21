import type { TypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { TypografiWrapper } from '~/utils/typografiWrapper';
import { LocaleType, SanityDokument } from '~/typer/sanity/sanity';
import { flettefeltTilTekst } from '~/utils/fletteTilTekst';

interface Props {
  tekstblokk: SanityDokument | undefined;
  typografi?: TypografiTyper;
  flettefeltInnhold?: string;
}

const TekstBlokk: React.FC<Props> = ({
  tekstblokk,
  typografi,
  flettefeltInnhold,
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
            if (props?.value?.flettefeltVerdi && flettefeltInnhold) {
              return (
                <span>
                  {flettefeltTilTekst(
                    props?.value?.flettefeltVerdi,
                    flettefeltInnhold,
                  )}
                </span>
              );
            } else {
              throw new Error(`Fant ikke flettefeltVerdi`);
            }
          },
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
