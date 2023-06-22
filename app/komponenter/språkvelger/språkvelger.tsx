import { Select } from '@navikt/ds-react';
import { useSpråk } from '~/root';
import { LocaleType } from '~/typer/sanity/sanity';
import css from './språkvelger.module.css';
import { GlobeIcon } from '@navikt/aksel-icons';

export const Språkvelger = () => {
  const [, settSpråk] = useSpråk();

  function endreSpråk(endring: React.ChangeEvent<HTMLSelectElement>) {
    const endringVerdi = endring.target.value as LocaleType;
    settSpråk(endringVerdi);
  }

  return (
    <>
      <Select
        label={<Label />}
        className={`${css.språkvelger}`}
        onChange={endring => {
          endreSpråk(endring);
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
