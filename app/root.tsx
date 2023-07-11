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
import { hentSanityData } from './server/hentSanityData.server';
import { ELocaleType } from './typer/felles';
import { hentSøker } from './server/hentSøker.server';
import { useState } from 'react';
import parse from 'html-react-parser';
import { hentDekoratorHtml } from './server/dekorator.server';
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
  const tekstData = await hentSanityData();
  const søkerData = await hentSøker(session);
  const dekoratørFragmenter = await hentDekoratorHtml();

  const data = {
    tekstData,
    søkerData,
    dekoratørFragmenter,
  };
  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function App() {
  const { tekstData, søkerData, dekoratørFragmenter } =
    useLoaderData<typeof loader>();
  const [språk, settSpråk] = useState<ELocaleType>(ELocaleType.NB);
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);
  const [endringsmeldingMottattDato, settEndringsmeldingMottattDato] =
    useState('');

  return (
    <Dokument språk={språk}>
      <Oppsett>
        <Outlet
          context={{
            sanityTekster: tekstData,
            språk: [språk, settSpråk],
            søker: søkerData,
            erSamtykkeBekreftet: [erSamtykkeBekreftet, settErSamtykkeBekreftet],
            endringsmeldingMottattDato: [
              endringsmeldingMottattDato,
              settEndringsmeldingMottattDato,
            ],
          }}
        />
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
  språk?: ELocaleType;
}

export function Dokument({ children, språk = ELocaleType.NB }: DokumentProps) {
  const { dekoratørFragmenter } = useLoaderData<typeof loader>();
  return (
    <html lang={språk}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {parse(dekoratørFragmenter.DECORATOR_STYLES, { trim: true })}
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
  const { dekoratørFragmenter } = useLoaderData<typeof loader>();

  return (
    <>
      {parse(dekoratørFragmenter.DECORATOR_HEADER, { trim: true })}
      {children}
      {parse(dekoratørFragmenter.DECORATOR_FOOTER, { trim: true })}
    </>
  );
}

export function ErrorBoundary() {
  return <Feilside />;
}
