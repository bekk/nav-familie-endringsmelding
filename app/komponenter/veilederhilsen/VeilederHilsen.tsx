import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { TypografiTyper } from '~/typer/typografi';
import { AppContext } from '~/typer/context';
import { useOutletContext } from '@remix-run/react';
import { hentSøkerFornavn } from '~/utils/hentSøkerData';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { useTekster } from '~/hooks/contextHooks';

const VeilederHilsen: React.FC = () => {
  const { søker } = useOutletContext<AppContext>();
  const { brukerHilsen, veilederhilsenInnhold } = useTekster(
    ESanitySteg.FORSIDE,
  );

  return (
    <GuidePanel poster className={`${css.poster}`}>
      <TekstBlokk
        tekstblokk={brukerHilsen}
        typografi={TypografiTyper.StegHeadingH2}
        flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }}
      />
      <TekstBlokk tekstblokk={veilederhilsenInnhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
