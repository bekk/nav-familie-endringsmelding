import { cssBundleHref } from '@remix-run/css-bundle';
import designsystemStyles from '@navikt/ds-css/dist/index.css';
import {
  json,
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { hentDataFraSanity } from './utils/sanityLoader';
import { LocaleType } from './typer/sanity/sanity';
import { hentSøker } from './utils/hentFraApi';
import { useState } from 'react';
import { loggInn } from '~/server/authorization';
import { API_TOKEN_NAME, commitSession, getSession } from '~/sessions';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: designsystemStyles,
  },
  {
    rel: 'preload',
    href: 'https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has(API_TOKEN_NAME)) {
    await loggInn(session);
  }
  const tekstData = await hentDataFraSanity().catch(feil => {
    //REDIRECT TIL FEIL SIDE
    throw Error('Kunne ikke hente sanity tekster');
  });
  const søkerData = await hentSøker(session).catch(feil => {
    //REDIRECT TIL FEIL SIDE
    throw Error('Kunne ikke hente søker data');
  });

  const data = { tekstData, søkerData };
  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function App() {
  const { tekstData, søkerData } = useLoaderData<typeof loader>();
  const [språk, settSpråk] = useState<LocaleType>(LocaleType.nb);

  return (
    <html lang={språk}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet
          context={{
            sanityTekster: tekstData,
            språkContext: [språk, settSpråk],
            søker: søkerData,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
