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
      <GlobeIcon title="a11y-title" />
      <Select
        label=""
        hideLabel
        className={`${css.språkvelger}`}
        onChange={evt => {
          handleChange(evt);
        }}
      >
        <option value={LocaleType.nb}> Bokmål</option>
        <option value={LocaleType.nn}>Nynorsk</option>
        <option value={LocaleType.en}>English</option>
      </Select>
    </>
  );
};
