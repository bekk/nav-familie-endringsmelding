import { Link } from '@navikt/ds-react';
import { PortableText } from '@portabletext/react';
import React from 'react';

import { useSpråk } from '~/hooks/contextHooks';
import { FlettefeltVerdier, ISanityDokument } from '~/typer/sanity/sanity';
import type { ETypografiTyper } from '~/typer/typografi';
import { flettefeltTilTekst } from '~/utils/fletteTilTekst';
import { TypografiWrapper } from '~/utils/TypografiWrapper';

interface Props {
  tekstblokk: ISanityDokument | undefined;
  typografi?: ETypografiTyper;
  flettefelter?: FlettefeltVerdier;
}

const TekstBlokk: React.FC<Props> = ({
  tekstblokk,
  typografi,
  flettefelter,
}: Props) => {
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
