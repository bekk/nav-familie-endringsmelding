import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

import { useBekreftetSamtykke, useTekster } from '~/hooks/contextHooks';
import { ESanityMappe, ESteg } from '~/typer/felles';
import { hentPathForSteg } from '~/utils/hentPath';

import Banner from '../banner/Banner';
import css from './hovedInnhold.module.css';

interface Props {
  måHaBekreftetSamtykke?: boolean;
  children?: React.ReactNode;
}

const HovedInnhold: React.FC<Props> = ({
  måHaBekreftetSamtykke = false,
  children,
}) => {
  const { bannerTekst } = useTekster(ESanityMappe.FELLES);
  const [erSamtykkeBekreftet] = useBekreftetSamtykke();
  const navigate = useNavigate();

  const skalRedirecte = måHaBekreftetSamtykke && !erSamtykkeBekreftet;

  useEffect(() => {
    if (skalRedirecte) {
      navigate(hentPathForSteg(ESteg.FORSIDE));
    }
  }, [skalRedirecte, navigate]);

  return (
    <>
      <Banner tekst={bannerTekst} />
      <main className={`${css.innholdKonteiner}`}>
        {!skalRedirecte && children}
      </main>
    </>
  );
};

export default HovedInnhold;
