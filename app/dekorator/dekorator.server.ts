import type { DecoratorFetchProps } from '@navikt/nav-dekoratoren-moduler/ssr';
import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr';

export async function hentDekoratorHtml() {
  const env = 'dev';

  const config: DecoratorFetchProps = {
    env: env ?? 'prod',
    serviceDiscovery: false, //process.env.IS_LOCALHOST !== "true", //virker som at den defaulter til true og slår på service discovery?
    params: {
      language: 'nb',
      context: 'privatperson',
      chatbot: false,
      simple: true,
      enforceLogin: false,
      redirectToApp: true,
      level: 'Level4',
      simpleFooter: true,
    },
  };

  return await fetchDecoratorHtml(config);
}
