import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './veileder.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { ISanityDokument } from '~/typer/sanity/sanity';

interface Props {
  tekst: ISanityDokument;
  poster?: boolean;
  overskrift?: ISanityDokument;
  søker?: string;
}

const Veileder: React.FC<Props> = ({
  tekst,
  poster,
  overskrift,
  søker,
}: Props) => {
  return (
    <GuidePanel
      poster={poster}
      className={poster ? `${css.poster}` : `${css.veilederPanel}`}
    >
      {overskrift && (
        <div className={`${css.tekstInnholdMellomrom}`}>
          <TekstBlokk
            tekstblokk={overskrift}
            typografi={ETypografiTyper.HEADING_H2}
            flettefelter={{ søkerNavn: søker }}
          />
        </div>
      )}
      <TekstBlokk tekstblokk={tekst} typografi={ETypografiTyper.BODY_SHORT} />
    </GuidePanel>
  );
};

export default Veileder;
