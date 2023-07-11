import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './veileder.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { ISanityDokument } from '~/typer/sanity/sanity';

interface Props {
  tekst: ISanityDokument;
  erForside?: boolean;
  overskrift?: ISanityDokument;
  søker?: string;
}

const Veileder: React.FC<Props> = ({
  tekst,
  erForside,
  overskrift,
  søker,
}: Props) => {
  return (
    <GuidePanel
      poster={erForside}
      className={erForside ? `${css.poster}` : `${css.veilederPanel}`}
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
