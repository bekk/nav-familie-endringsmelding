import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

import {
  useBekreftetSamtykke,
  useTekster,
  useYtelse,
} from '~/hooks/contextHooks';
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
  const ytelse = useYtelse();

  const skalRedirecte = måHaBekreftetSamtykke && !erSamtykkeBekreftet;

  useEffect(() => {
    if (skalRedirecte) {
      navigate(hentPathForSteg(ytelse, ESteg.FORSIDE));
    }
  }, [skalRedirecte, navigate, ytelse]);

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
