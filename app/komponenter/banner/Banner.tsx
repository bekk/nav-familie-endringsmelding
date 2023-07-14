import { Heading } from '@navikt/ds-react';

import { ISanityDokument } from '~/typer/sanity/sanity';
import { ETypografiTyper } from '~/typer/typografi';

import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './banner.module.css';

interface Props {
  tekst: ISanityDokument | string;
}
const Banner: React.FC<Props> = ({ tekst }) => {
  return (
    <section className={`${css.bannerStil}`} role="banner">
      {typeof tekst === 'string' ? (
        <Heading level="1" size="large">
          {tekst}
        </Heading>
      ) : (
        <TekstBlokk
          tekstblokk={tekst}
          typografi={ETypografiTyper.BANNER_HEADING}
        />
      )}
    </section>
  );
};

export default Banner;
