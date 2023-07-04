import { GuidePanel } from '@navikt/ds-react';
import { Dokument } from '~/root';
import Banner from '../banner/Banner';
import HovedInnholdCss from '../hovedInnhold/hovedInnhold.module.css';
import css from './feilside.module.css';
import { ELocaleType } from '~/typer/felles';
import { DecoratorElements } from '@navikt/nav-dekoratoren-moduler/ssr';

interface Props {
  dekoratørFragmenter: DecoratorElements;
}

const Feilside: React.FC<Props> = ({ dekoratørFragmenter }: Props) => {
  return (
    <Dokument språk={ELocaleType.NB} dekoratørFragmenter={dekoratørFragmenter}>
      <Banner tekst={'Endringsmelding for barnetrygd'} />
      <main className={`${HovedInnholdCss.innholdKonteiner}`}>
        <GuidePanel className={`${css.feilmeldingPanel}`}>
          <p>En feil har oppstått! Vennligst prøv igjen.</p>
        </GuidePanel>
      </main>
    </Dokument>
  );
};

export default Feilside;
