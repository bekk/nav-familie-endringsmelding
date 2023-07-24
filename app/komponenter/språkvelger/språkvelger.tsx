import { GlobeIcon } from '@navikt/aksel-icons';
import { Select } from '@navikt/ds-react';

import { useSpråk } from '~/hooks/contextHooks';
import { ELocaleType } from '~/typer/felles';

import css from './språkvelger.module.css';

export const Språkvelger = () => {
  const [språk, settSpråk] = useSpråk();

  return (
    <>
      <Select
        label={<Label />}
        className={`${css.språkvelger}`}
        value={språk}
        data-testid="språkvelger"
        autoComplete="on"
        onChange={endring => {
          settSpråk(endring.target.value as ELocaleType);
          document.documentElement.lang = endring.target.value;
        }}
      >
        <option value={ELocaleType.NB}>Norsk (Bokmål)</option>
        <option value={ELocaleType.NN}>Norsk (Nynorsk)</option>
        <option value={ELocaleType.EN}>English</option>
      </Select>
    </>
  );
};

const Label = () => {
  return (
    <span className={`${css.label}`}>
      <GlobeIcon title="globe-icon" fontSize={'1.5rem'} />
      <span> Språk/language </span>
    </span>
  );
};
