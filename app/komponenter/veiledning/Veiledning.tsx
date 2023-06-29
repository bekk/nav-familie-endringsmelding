import { GuidePanel } from '@navikt/ds-react';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { SanityDokument } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import css from './veiledning.module.css';

interface Props {
  hilsen: SanityDokument;
}

const Veiledning: React.FC<Props> = ({ hilsen }: Props) => {
  return (
    <GuidePanel className={`${css.veilederPanel}`}>
      <div className={`${css.test}`}>
        <TekstBlokk tekstblokk={hilsen} typografi={TypografiTyper.BodyShort} />
      </div>
    </GuidePanel>
  );
};

export default Veiledning;
