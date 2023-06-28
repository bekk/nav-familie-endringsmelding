import type { ETypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { FlettefeltVerdier, ISanityDokument } from '~/typer/sanity/sanity';
import { TypografiWrapper } from '~/utils/TypografiWrapper';
import { flettefeltTilTekst } from '~/utils/fletteTilTekst';
import { Link } from '@navikt/ds-react';
import { useSpråk } from '~/hooks/contextHooks';

interface IProps {
  tekstblokk: ISanityDokument | undefined;
  typografi?: ETypografiTyper;
  flettefelter?: FlettefeltVerdier;
}

const TekstBlokk: React.FC<IProps> = ({
  tekstblokk,
  typografi,
  flettefelter,
}: IProps) => {
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
                <span>
                  {flettefeltTilTekst(
                    props.value.flettefeltVerdi,
                    flettefelter,
                  )}
                </span>
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
