import designsystemStyles from '@navikt/ds-css/dist/index.css';
import { cssBundleHref } from '@remix-run/css-bundle';
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
  ShouldRevalidateFunction,
  useLoaderData,
} from '@remix-run/react';
import parse from 'html-react-parser';

import { loggInn } from '~/server/authorization';
import { API_TOKEN_NAME, commitSession, getSession } from '~/sessions';

import css from './root.module.css';
import { hentDekoratorHtml } from './server/dekorator.server';
import Feilside from './sider/Feilside';
import { ELocaleType } from './typer/felles';

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

export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  defaultShouldRevalidate,
}) => {
  if (formMethod === 'POST') {
    return false;
  }
  return defaultShouldRevalidate;
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has(API_TOKEN_NAME)) {
    await loggInn(session);
  }
  const dekoratørFragmenter = await hentDekoratorHtml();

  const data = {
    dekoratørFragmenter,
  };
  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function App() {
  const { dekoratørFragmenter } = useLoaderData<typeof loader>();

  return (
    <Dokument>
      <Oppsett>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {parse(dekoratørFragmenter.DECORATOR_SCRIPTS, { trim: true })}
        <LiveReload />
      </Oppsett>
    </Dokument>
  );
}

interface DokumentProps {
  children: React.ReactNode;
}

export function Dokument({ children }: DokumentProps) {
  const { dekoratørFragmenter } = useLoaderData<typeof loader>();
  return (
    <html lang={ELocaleType.NB}>
      <head>
        <title>Endringsmelding</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {parse(dekoratørFragmenter.DECORATOR_STYLES, { trim: true })}
        <Links />
      </head>
      <body className={`${css.body}`}>{children}</body>
    </html>
  );
}

interface OppsettProps {
  children: React.ReactNode;
}

export function Oppsett({ children }: OppsettProps) {
  const { dekoratørFragmenter } = useLoaderData<typeof loader>();

  return (
    <>
      <div role="navigation">
        {parse(dekoratørFragmenter.DECORATOR_HEADER, { trim: true })}
      </div>
      {children}
      <div role="navigation">
        {parse(dekoratørFragmenter.DECORATOR_FOOTER, { trim: true })}
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return <Feilside />;
}
