import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { TypografiTyper } from '~/typer/typografi';
import { AppContext } from '~/typer/context';
import { useOutletContext } from '@remix-run/react';
import { hentSøkerFornavn } from '~/utils/hentSøkerData';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { IForsideTekstinnhold } from '~/typer/sanity/sanityForside';

interface Props {
  tekster: IForsideTekstinnhold;
}

const VeilederHilsen: React.FC<Props> = ({ tekster }: Props) => {
  const { søker } = useOutletContext<AppContext>();

  return (
    <GuidePanel poster className={`${css.poster}`}>
      <div className={`${css.tekstInnholdMellomrom}`}>
        <TekstBlokk
          tekstblokk={tekster.brukerHilsen}
          typografi={TypografiTyper.HeadingH2}
          flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }}
        />
      </div>
      <TekstBlokk tekstblokk={tekster.veilederhilsenInnhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
