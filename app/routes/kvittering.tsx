import {
  useEndringsmeldingMottattDato,
  useTekster,
} from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';

export default function Kvittering() {
  const [endringsmeldingMottattDato] = useEndringsmeldingMottattDato();
  const tekster = useTekster(ESanityMappe.KVITTERING);

  //For å teste at mottatt dato er mottatt når man sender til backend
  console.log(endringsmeldingMottattDato);
  return (
    <HovedInnhold>
      <StegIndikator nåværendeSteg={3} />
      <TekstBlokk
        tekstblokk={tekster.kvitteringTittel}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
      />
    </HovedInnhold>
  );
}
