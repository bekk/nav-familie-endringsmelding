import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';
import StegIndikator from '~/komponenter/stegindikator/StegIndikator';

export default function DokumentasjonSide() {
  return (
    <HovedInnhold /*måHaBekreftetSamtykke*/>
      <StegIndikator nåværendeSteg={2} />
      <h1>Dokumentasjonsopplastning her</h1>
    </HovedInnhold>
  );
}
