import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { IAppContext } from '~/typer/context';
import { useOutletContext } from '@remix-run/react';
import { hentSøkerFornavn } from '~/utils/hentSøkerData';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { ForsideTekstinnhold } from '~/typer/sanity/sanityForside';

interface Props {
  tekster: ForsideTekstinnhold;
}

const VeilederHilsen: React.FC<Props> = ({ tekster }: Props) => {
  const { søker } = useOutletContext<IAppContext>();

  return (
    <GuidePanel poster className={`${css.poster}`}>
      <TekstBlokk
        tekstblokk={tekster.brukerHilsen}
        typografi={ETypografiTyper.StegHeadingH2}
        flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }}
      />
      <TekstBlokk tekstblokk={tekster.veilederhilsenInnhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
