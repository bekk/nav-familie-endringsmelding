import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
/* import { useTekster } from '~/hooks/contextHooks';
 */ import css from './veiledning.module.css';
/* import { ESanityMappe } from '~/typer/felles';
 */ import { ETypografiTyper } from '~/typer/typografi';
import { ISanityDokument } from '~/typer/sanity/sanity';
import { useState } from 'react';

interface Props {
  tekst: ISanityDokument;
  veilederTypografi: ETypografiTyper;
}

const Veiledning: React.FC<Props> = ({ tekst, veilederTypografi }: Props) => {
  const [erPoster, settErPoster] = useState(false);
  if (veilederTypografi === ETypografiTyper.HEADING_H2) {
    settErPoster(true);
  }
  /*   const { veilederInnhold } = useTekster(ESanityMappe.SEND_ENDRINGER); */

  return (
    <GuidePanel poster={erPoster} className={`${css.veilederPanel}`}>
      <TekstBlokk tekstblokk={tekst} typografi={veilederTypografi} />
    </GuidePanel>
  );
};

export default Veiledning;
