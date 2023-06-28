import { Select } from '@navikt/ds-react';
import { ELocaleType } from '~/typer/common';
import css from './språkvelger.module.css';
import { GlobeIcon } from '@navikt/aksel-icons';
import { useSpråk } from '~/hooks/contextHooks';

export const Språkvelger = () => {
  const [, settSpråk] = useSpråk();

  return (
    <>
      <Select
        label={<Label />}
        className={`${css.språkvelger}`}
        onChange={endring => {
          settSpråk(endring.target.value as ELocaleType);
        }}
      >
        <option value={ELocaleType.nb}>Norsk (Bokmål)</option>
        <option value={ELocaleType.nn}>Norsk (Nynorsk)</option>
        <option value={ELocaleType.en}>English</option>
      </Select>
    </>
  );
};

const Label = () => {
  return (
    <div className={`${css.label}`}>
      <GlobeIcon title="a11y-title" fontSize={'1.5rem'} />
      <span> Språk/language </span>
    </div>
  );
};
