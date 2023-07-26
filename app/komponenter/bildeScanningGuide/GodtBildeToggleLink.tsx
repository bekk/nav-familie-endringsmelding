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
    <Link onClick={vedToggle} aria-expanded={erÅpen} className={`${css.lenke}`}>
      <TekstBlokk tekstblokk={tekster.taGodtBildeLink}></TekstBlokk>
      {erÅpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Link>
  );
};

export default GodtBildeToggleLink;
