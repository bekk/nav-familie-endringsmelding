import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { IForsideTekstinnhold } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { AppContext } from '~/typer/context';
import { useOutletContext } from '@remix-run/react';
import { hentSøkerFornavn } from '~/utils/hentSøkerData';
import TekstBlokk from '../tekstblokk/TekstBlokk';

interface Props {
  tekster: IForsideTekstinnhold;
}

const VeilederHilsen: React.FC<Props> = ({ tekster }: Props) => {
  const { søker } = useOutletContext<AppContext>();

  return (
    <GuidePanel poster className={`${css.poster}`}>
      <TekstBlokk
        tekstblokk={tekster.brukerHilsen}
        typografi={TypografiTyper.StegHeadingH2}
        flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }}
      />
      <TekstBlokk tekstblokk={tekster.veilederhilsenInnhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
