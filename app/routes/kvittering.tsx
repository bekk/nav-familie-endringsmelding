import Spinner from '~/komponenter/Spinner';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import css from './_index.module.css';
import { useState } from 'react';

export default function Kvittering() {
  const [hentetKvittering, settHentetKvittering] = useState<boolean>(false);
  //For å få commite
  settHentetKvittering(false);
  return (
    <HovedInnhold>
      {!hentetKvittering ? (
        <Spinner />
      ) : (
        <>
          <div className={`${css.toppMargin}`}>
            <p>Kvitteringsside</p>
          </div>
        </>
      )}
    </HovedInnhold>
  );
}
