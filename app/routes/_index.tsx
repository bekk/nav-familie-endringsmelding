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
/* import { useEffect, useState } from 'react'; */

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
/* 
const API_URL_BACKEND: string =
  'http://localhost:8099/local/cookie?redirect=http://localhost:3000&issuerId=selvbetjening&audience=aud-localhost';
 */
export default function Index() {
  const tekster = useTekster(ESanitySteg.FORSIDE);
  /* 
  const [navn, settNavn] = useState(''); */
  /* 
  let headers = new Headers();
  //headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  //headers.append('Access-Control-Request-Method', 'GET');

  useEffect(() => {
    let data;
    const hentData = async () => {
      data = await fetch(API_URL_BACKEND, {
        headers: headers,
      }).catch(err => console.log);
      console.log('data: ', data);
    };
    hentData();
    if (data) {
      settNavn(data);
    }
  }, [navn]); */

  return (
    <div className={`${css.fyllSide}`}>
      <div className={`${css.innholdKonteiner}`}>
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
      </div>
    </div>
  );
}
