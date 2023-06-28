import type { V2_MetaFunction } from '@remix-run/node';
import css from './_index.module.css';
import Spinner from '~/komponenter/Spinner';
import VeilederHilsen from '~/komponenter/veilederhilsen/VeilederHilsen';
import { ESanitySteg } from '~/typer/sanity/sanity';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { TypografiTyper } from '~/typer/typografi';
import SamtykkePanel from '~/komponenter/SamtykkePanel';
import { useTekster } from '~/hooks/contextHooks';
import { Språkvelger } from '~/komponenter/språkvelger/språkvelger';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import Banner from '~/komponenter/banner/Banner';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Familie endringsmelding' },
    {
      name: 'description',
      content:
        'Endringsmelding for barnetrygd, kontantstøtte og enslig forsørger',
    },
  ];
};

export default function Index() {
  const tekster = useTekster(ESanitySteg.FORSIDE);

  return (
    <>
      <Banner bannerTekst={tekster.bannerTekstForside} />
      <InnholdKonteiner>
        {!tekster ? (
          <Spinner />
        ) : (
          <>
            <TekstBlokk
              tekstblokk={tekster.tittel}
              typografi={TypografiTyper.StegHeadingH1}
            />
            <Språkvelger />
            <VeilederHilsen
              innhold={tekster.veilederhilsenInnhold}
              hilsen={tekster.brukerHilsen}
            />
            <SamtykkePanel
              innhold={tekster.samtykkePanelMelding}
              samtykke={tekster.samtykkePanelSamtykke}
              feilmelding={tekster.samtykkePanelFeilmelding}
            />
            <div className={`${css.personvernerklaeringLink}`}>
              <TekstBlokk
                tekstblokk={tekster.linkTilPersonvernerklaering}
              ></TekstBlokk>
            </div>
          </>
        )}
      </InnholdKonteiner>
    </>
  );
}
