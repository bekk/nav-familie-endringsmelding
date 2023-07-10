import { GuidePanel } from '@navikt/ds-react';
import Banner from '../banner/Banner';
import HovedInnholdCss from '../hovedInnhold/hovedInnhold.module.css';
import css from './feilside.module.css';
import { ELocaleType } from '~/typer/felles';
import { Links, Meta } from '@remix-run/react';

const Feilside: React.FC = () => {
  return (
    <html lang={ELocaleType.NB}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Banner tekst={'Endringsmelding for barnetrygd'} />
        <main className={`${HovedInnholdCss.innholdKonteiner}`}>
          <GuidePanel className={`${css.feilmeldingPanel}`}>
            <p>En feil har oppstått! Vennligst prøv igjen.</p>
          </GuidePanel>
        </main>
      </body>
    </html>
  );
};

export default Feilside;
