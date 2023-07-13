import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import {
  useTekster,
  useEndringsmeldingMottattDato,
} from '~/hooks/contextHooks';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import VeilederPanel from '~/komponenter/veilederpanel/VeilederPanel';

export default function Kvittering() {
  const [endringsmeldingMottattDato] = useEndringsmeldingMottattDato();
  const tekster = useTekster(ESanityMappe.KVITTERING);

  //For å teste at mottatt dato er mottatt når man sender til backend
  console.log(endringsmeldingMottattDato);
  return (
    <HovedInnhold>
      <StegIndikator nåværendeSteg={2} />
      <TekstBlokk
        tekstblokk={tekster.kvitteringTittel}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
      />
      <VeilederPanel innhold={tekster.kvitteringVeileder} />
    </HovedInnhold>
  );
}
