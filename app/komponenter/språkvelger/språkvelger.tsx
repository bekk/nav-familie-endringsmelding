import { Select } from '@navikt/ds-react';
import { LocaleType } from '~/typer/sanity/sanity';
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
          settSpråk(endring.target.value as LocaleType);
        }}
      >
        <option value={LocaleType.nb}>Norsk (Bokmål)</option>
        <option value={LocaleType.nn}>Norsk (Nynorsk)</option>
        <option value={LocaleType.en}>English</option>
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
