import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import React from 'react';

import { useTekster } from '~/hooks/contextHooks';
import { ESanityMappe } from '~/typer/felles';

import TekstBlokk from '../tekstblokk/TekstBlokk';
import css from './godtBildeToggleLink.module.css';

interface Props {
  erÅpen?: boolean;
  vedToggle: () => void;
}

const GodtBildeToggleLink = (props: Props) => {
  const { erÅpen = false, vedToggle } = props;
  const tekster = useTekster(ESanityMappe.DOKUMENTASJON);

  return (
    <span className={`${css.godtBildeToggleLink}`}>
      <Link onClick={vedToggle} aria-expanded={erÅpen}>
        <TekstBlokk tekstblokk={tekster.taGodtBildeLink}></TekstBlokk>
        <span className={`${css.chevronKonteiner}`}>
          {erÅpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </Link>
    </span>
  );
};

export default GodtBildeToggleLink;
