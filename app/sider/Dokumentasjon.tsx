import { useTekster } from '~/hooks/contextHooks';
import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';
import TekstBlokk from '~/komponenter/tekstblokk/TekstBlokk';
import { ESanityMappe } from '~/typer/felles';
import { ETypografiTyper } from '~/typer/typografi';

export default function DokumentasjonSide() {
  const tekster = useTekster(ESanityMappe.DOKUMENTASJON);
  return (
    <HovedInnhold /*måHaBekreftetSamtykke*/>
      <StegIndikator nåværendeSteg={2} />
      <TekstBlokk
        tekstblokk={tekster.dokumentasjonOverskrift}
        typografi={ETypografiTyper.STEG_HEADING_SMALL_H1}
        dataTestid="overskriftDokumentering"
      />
    </HovedInnhold>
  );
}
