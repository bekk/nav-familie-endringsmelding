import { GuidePanel } from '@navikt/ds-react';
import { Dokument } from '~/root';
import { LocaleType } from '~/typer/sanity/sanity';
import Banner from '../banner/Banner';
import HovedInnholdCss from '../hovedInnhold/hovedInnhold.module.css';
import css from './feilside.module.css';

const Feilside: React.FC = () => {
  return (
    <Dokument språk={LocaleType.nb}>
      <Banner bannerTekst={'Endringsmelding for barnetrygd'} />
      <main className={`${HovedInnholdCss.innholdKonteiner}`}>
        <GuidePanel className={`${css.feilmeldingPanel}`}>
          <p>En feil har oppstått! Vennligst prøv igjen.</p>
        </GuidePanel>
      </main>
    </Dokument>
  );
};

export default Feilside;
