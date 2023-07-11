import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import css from './_index.module.css';
import { useEndringsmeldingMottattDato } from '~/hooks/contextHooks';

export default function Kvittering() {
  const [endringsmeldingMottattDato] = useEndringsmeldingMottattDato();
  return (
    <HovedInnhold>
      <div className={`${css.toppMargin}`}>
        <p>Kvitteringsside</p>
        <p>Mottatt dato: {endringsmeldingMottattDato}</p>
      </div>
    </HovedInnhold>
  );
}
