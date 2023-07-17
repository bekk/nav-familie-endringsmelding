import { useTekster } from '~/hooks/contextHooks';
import BekreftelseBoks from '~/komponenter/bekreftelsesboks/Bekreftelseboks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import VeilederPanel from '~/komponenter/veilederpanel/VeilederPanel';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';

export default function KvitteringSide() {
  const tekster = useTekster(ESanityMappe.KVITTERING);

  return (
    <HovedInnhold>
      <StegIndikator nåværendeSteg={3} />
      <TekstBlokk
        tekstblokk={tekster.kvitteringTittel}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
      />
      <BekreftelseBoks />
      <VeilederPanel innhold={tekster.kvitteringVeileder} />
    </HovedInnhold>
  );
}
