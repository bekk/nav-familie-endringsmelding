import type { ETypografiTyper } from '~/typer/typografi';
import React from 'react';
import { PortableText } from '@portabletext/react';
import { FlettefeltVerdier, ISanityDokument } from '~/typer/sanity/sanity';
import { TypografiWrapper } from '~/utils/TypografiWrapper';
import { flettefeltTilTekst } from '~/utils/fletteTilTekst';
import { Link } from '@navikt/ds-react';
import { useSpråk } from '~/hooks/contextHooks';

interface Props {
  tekstblokk: ISanityDokument | undefined;
  typografi?: ETypografiTyper;
  flettefelter?: FlettefeltVerdier;
  dataTestid?: string;
}

const TekstBlokk: React.FC<Props> = ({
  tekstblokk,
  typografi,
  flettefelter,
  dataTestid,
}: Props) => {
  const [språk] = useSpråk();

  return tekstblokk ? (
    <PortableText
      value={tekstblokk[språk]}
      components={{
        block: {
          normal: ({ children }) => (
            <TypografiWrapper
              typografi={typografi}
              style={{ margin: '0' }}
              dataTestid={dataTestid}
            >
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
