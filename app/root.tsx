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
import { ELocaleType } from './typer/felles';
import { hentSøker } from './utils/hentFraApi';
import { useState } from 'react';
import { loggInn } from '~/server/authorization';
import { API_TOKEN_NAME, commitSession, getSession } from '~/sessions';
import Feilside from './komponenter/feilside/Feilside';

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
  const tekstData = await hentDataFraSanity();
  const søkerData = await hentSøker(session);

  const data = { tekstData, søkerData };
  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function App() {
  const { tekstData, søkerData } = useLoaderData<typeof loader>();
  const [språk, settSpråk] = useState<ELocaleType>(ELocaleType.NB);
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);
  return (
    <Dokument språk={språk}>
      <Oppsett>
        <Outlet
          context={{
            sanityTekster: tekstData,
            språk: [språk, settSpråk],
            søker: søkerData,
            erSamtykkeBekreftet: [erSamtykkeBekreftet, settErSamtykkeBekreftet],
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </Oppsett>
    </Dokument>
  );
}

interface DokumentProps {
  children: React.ReactNode;
  språk: ELocaleType;
}

export function Dokument({ children, språk }: DokumentProps) {
  return (
    <html lang={språk}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
}

interface OppsettProps {
  children: React.ReactNode;
}

export function Oppsett({ children }: OppsettProps) {
  //Her kommer dekoratør
  return <>{children}</>;
}

export function ErrorBoundary() {
  return <Feilside />;
}
