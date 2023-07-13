import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './veilederpanel.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { ISanityDokument } from '~/typer/sanity/sanity';

interface Props {
  innhold: ISanityDokument;
  poster?: boolean;
  overskrift?: React.ReactNode;
}

const VeilederPanel: React.FC<Props> = ({
  innhold,
  poster,
  overskrift,
}: Props) => {
  return (
    <GuidePanel
      poster={poster}
      className={poster ? `${css.poster}` : `${css.veilederPanel}`}
    >
      {overskrift && (
        <div className={`${css.tekstInnholdMellomrom}`}>{overskrift}</div>
      )}
      <TekstBlokk tekstblokk={innhold} typografi={ETypografiTyper.BODY_SHORT} />
    </GuidePanel>
  );
};

export default VeilederPanel;
