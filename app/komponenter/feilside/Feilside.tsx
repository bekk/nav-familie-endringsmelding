import { GuidePanel } from '@navikt/ds-react';
import { Dokument } from '~/root';
import Banner from '../banner/Banner';
import HovedInnholdCss from '../hovedInnhold/hovedInnhold.module.css';
import css from './feilside.module.css';
import { ELocaleType } from '~/typer/felles';

const Feilside: React.FC = () => {
  return (
    <Dokument språk={ELocaleType.NB}>
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
