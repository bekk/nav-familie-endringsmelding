import type { DecoratorFetchProps } from '@navikt/nav-dekoratoren-moduler/ssr';
import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr';
import { LocaleType } from '~/typer/sanity/sanity';

export async function hentDekoratorHtml(språk?: LocaleType) {
  const config: DecoratorFetchProps = {
    env: 'dev',
    serviceDiscovery: false,
    params: {
      language: 'nb' || språk,
      /*  availableLanguages: [
        { handleInApp: true, locale: 'nb' },
        { handleInApp: true, locale: 'en' },
      ], */
      context: 'privatperson',
      simple: true,
    },
  };

  return await fetchDecoratorHtml(config);
}
