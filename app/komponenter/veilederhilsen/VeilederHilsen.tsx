import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { ETypografiTyper } from '~/typer/typografi';
import { IAppContext } from '~/typer/context';
import { useOutletContext } from '@remix-run/react';
import { hentSøkerFornavn } from '~/utils/hentSøkerNavn';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';

const VeilederHilsen: React.FC = () => {
  const { søker } = useOutletContext<IAppContext>();
  const { brukerHilsen, veilederhilsenInnhold } = useTekster(
    ESanityMappe.FORSIDE,
  );

  return (
    <GuidePanel poster className={`${css.poster}`}>
      <div className={`${css.tekstInnholdMellomrom}`}>
        <TekstBlokk
          tekstblokk={brukerHilsen}
          typografi={ETypografiTyper.HEADING_H2}
          flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }}
        />
      </div>
      <TekstBlokk tekstblokk={veilederhilsenInnhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
