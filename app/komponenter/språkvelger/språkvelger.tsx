import { Select } from '@navikt/ds-react';
import { useSpråk } from '~/root';
import { LocaleType } from '~/typer/sanity/sanity';
import css from './språkvelger.module.css';
import { GlobeIcon } from '@navikt/aksel-icons';

export const Språkvelger = () => {
  const [, settSpråk] = useSpråk();

  function handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    settSpråk(evt.target.value as LocaleType);
  }

  return (
    <>
      <Select
        label={<Label />}
        className={`${css.språkvelger}`}
        onChange={evt => {
          handleChange(evt);
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
