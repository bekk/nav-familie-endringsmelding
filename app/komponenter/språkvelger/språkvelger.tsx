import { Select } from '@navikt/ds-react';
import { ELocaleType } from '~/typer/felles';
import css from './språkvelger.module.css';
import { GlobeIcon } from '@navikt/aksel-icons';
import { useSpråk } from '~/hooks/contextHooks';

export const Språkvelger = () => {
  const [språk, settSpråk] = useSpråk();

  return (
    <>
      <Select
        label={<Label />}
        className={`${css.språkvelger}`}
        value={språk}
        autoComplete="on"
        onChange={endring => {
          settSpråk(endring.target.value as ELocaleType);
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
    <div className={`${css.label}`}>
      <GlobeIcon title="globe-icon" fontSize={'1.5rem'} aria-hidden={false} />
      <span> Språk/language </span>
    </div>
  );
};
