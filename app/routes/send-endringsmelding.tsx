import React from 'react';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanitySteg } from '~/typer/sanity/sanity';
import { TypografiTyper } from '~/typer/typografi';
import { useTekster } from '~/hooks/contextHooks';
import InnholdKonteiner from '~/komponenter/innholdkonteiner/InnholdKonteiner';
import css from './send-endringsmelding.module.css';
import { useNavigate } from '@remix-run/react';
import { Button } from '@navikt/ds-react';
import { hentPathForSteg } from '~/utils/hentPathForSteg';

export default function SendEndringsmelding() {
  const tekster = useTekster(ESanitySteg.SEND_ENDRINGER);
  const navigate = useNavigate();
  return (
    <InnholdKonteiner>
      <>
        <TekstBlokk
          tekstblokk={tekster.overskrift}
          typografi={TypografiTyper.StegHeadingH1}
        />
        <div className={`${css.navigeringsKnapper}`}>
          <Button
            variant={'primary'}
            onClick={() => navigate(hentPathForSteg(ESanitySteg.FORSIDE))}
          >
            Tilbake
          </Button>
          <Button variant={'secondary'}>Gå videre</Button>
        </div>
      </>
    </InnholdKonteiner>
  );
}
