import css from './banner.module.css';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { Heading } from '@navikt/ds-react';
import { ETypografiTyper } from '~/typer/typografi';
import { ISanityDokument } from '~/typer/sanity/sanity';

interface Props {
  tekst: ISanityDokument | string;
}
const Banner: React.FC<Props> = ({ tekst }) => {
  return (
    <section className={`${css.lillaBannerFullBredde}`} role="banner">
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
