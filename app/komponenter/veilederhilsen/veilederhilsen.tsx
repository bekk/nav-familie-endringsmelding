import { GuidePanel, Heading } from '@navikt/ds-react';

import css from './veilederhilsen.module.css';

export default function VeilederHilsen() {
  return (
    <GuidePanel poster className={`${css.poster}`}>
      <Heading level="2" size="xlarge" className={`${css.tittelMargin}`}>
        Hei [fornavn]
      </Heading>
      Du må melde fra til oss hvis:
      <ul className={`${css.liste}`}>
        <li>Familiesituasjonen din endrer seg.</li>
        <li>Dere planlegger opphold i utlandet.</li>
        <li>Det er endring i arbeidsforhold i utlandet.</li>
        <li>Du ikke lenger har rett til utvidet barnetrygd.</li>
      </ul>
    </GuidePanel>
  );
}
