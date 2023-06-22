import { GuidePanel } from '@navikt/ds-react';
import css from './veilederhilsen.module.css';
import { SanityDokument } from '~/typer/sanity/sanity';
import TekstBlokk from '../tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import { AppContext } from '~/typer/context';
import { useOutletContext } from '@remix-run/react';
import { hentSøkerFornavn } from '~/utils/hentSøkerData';

interface Props {
  innhold: SanityDokument | undefined;
  hilsen: SanityDokument | undefined;
}

const VeilederHilsen: React.FC<Props> = ({ innhold, hilsen }: Props) => {
  const { søker } = useOutletContext<AppContext>();

  return (
    <GuidePanel poster className={`${css.poster}`}>
      <TekstBlokk
        tekstblokk={hilsen}
        typografi={TypografiTyper.StegHeadingH2}
        flettefelter={{ søkerNavn: hentSøkerFornavn(søker) }}
      />
      <TekstBlokk tekstblokk={innhold} />
    </GuidePanel>
  );
};

export default VeilederHilsen;
