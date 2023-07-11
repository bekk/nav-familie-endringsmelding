import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import { useTekster } from '~/hooks/contextHooks';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import Bekreftelsesboks from '~/komponenter/bekreftelsesboks/Bekreftelseboks';

export default function Kvittering() {
  const tekster = useTekster(ESanityMappe.KVITTERING);

  return (
    <HovedInnhold>
      <StegIndikator nåværendeSteg={3} />
      <TekstBlokk
        tekstblokk={tekster.kvitteringTittel}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
      />
      <Bekreftelsesboks />
    </HovedInnhold>
  );
}
