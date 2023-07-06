import type { DecoratorFetchProps } from '@navikt/nav-dekoratoren-moduler/ssr';
import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr';

export async function hentDekoratorHtml() {
  const config: DecoratorFetchProps = {
    env: 'dev',
    serviceDiscovery: false,
    params: {
      language: 'nb',
      context: 'privatperson',
      simple: true,
    },
  };
  console.log('henter dekoratør');

  return await fetchDecoratorHtml(config);
}
