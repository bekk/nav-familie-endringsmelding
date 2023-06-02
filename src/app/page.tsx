import { BodyShort } from '@navikt/ds-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      Hello{' '}
      <BodyShort className={styles.enkelKlasse}>sommerstudenter!</BodyShort>
    </main>
  );
}
