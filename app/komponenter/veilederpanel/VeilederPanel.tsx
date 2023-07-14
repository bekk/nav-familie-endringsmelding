import { GuidePanel } from '@navikt/ds-react';

import { ISanityDokument } from '~/typer/sanity/sanity';
import { ETypografiTyper } from '~/typer/typografi';

import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './veilederpanel.module.css';

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
      className={poster ? `${css.veilederPanelPoster}` : `${css.veilederPanel}`}
      data-testid="veilederPanel"
    >
      {overskrift && <div className={`${css.bunnMargin}`}>{overskrift}</div>}
      <TekstBlokk tekstblokk={innhold} typografi={ETypografiTyper.BODY_SHORT} />
    </GuidePanel>
  );
};

export default VeilederPanel;
