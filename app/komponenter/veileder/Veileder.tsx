import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './veileder.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { ISanityDokument } from '~/typer/sanity/sanity';

interface Props {
  tekst: ISanityDokument;
  poster?: boolean;
  overskrift?: React.ReactNode;
}

const Veileder: React.FC<Props> = ({ tekst, poster, overskrift }: Props) => {
  return (
    <GuidePanel
      poster={poster}
      className={poster ? `${css.poster}` : `${css.veilederPanel}`}
    >
      {overskrift && (
        <div className={`${css.tekstInnholdMellomrom}`}>{overskrift}</div>
      )}
      <TekstBlokk tekstblokk={tekst} typografi={ETypografiTyper.BODY_SHORT} />
    </GuidePanel>
  );
};

export default Veileder;
