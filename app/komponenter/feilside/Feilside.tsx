import { GuidePanel } from '@navikt/ds-react';
import { Dokument, Oppsett } from '~/root';
import { LocaleType } from '~/typer/sanity/sanity';

const Feilside: React.FC = () => {
  return (
    <Dokument språk={LocaleType.nb}>
      <Oppsett>
        <GuidePanel>
          <p>En feil har oppstått!</p>
        </GuidePanel>
      </Oppsett>
    </Dokument>
  );
};

export default Feilside;
