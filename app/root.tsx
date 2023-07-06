import { cssBundleHref } from '@remix-run/css-bundle';
import designsystemStyles from '@navikt/ds-css/dist/index.css';
import { LinksFunction, LoaderArgs, LoaderFunction } from '@remix-run/node';
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
import { DecoratorElements } from '@navikt/nav-dekoratoren-moduler/ssr';
import parse from 'html-react-parser';
import { hentDekoratorHtml } from './server/dekorator.server';
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
  const tekstData = await hentDataFraSanity().catch(feil => {
    //REDIRECT TIL FEIL SIDE
    throw Error('Kunne ikke hente sanity tekster');
  });
  const søkerData = await hentSøker(request).catch(feil => {
    //REDIRECT TIL FEIL SIDE
    throw Error('Kunne ikke hente søker data');
  });

  const dekoratørFragmenter = await hentDekoratorHtml();

  return {
    tekstData,
    søkerData,
    dekoratørFragmenter,
  };
};

export default function App() {
  const { tekstData, søkerData, dekoratørFragmenter } =
    useLoaderData<typeof loader>();
  const [språk, settSpråk] = useState<ELocaleType>(ELocaleType.NB);
  const [erSamtykkeBekreftet, settErSamtykkeBekreftet] = useState(false);

  return (
    <Dokument språk={språk} dekoratørFragmenter={dekoratørFragmenter}>
      <Oppsett dekoratørFragmenter={dekoratørFragmenter}>
        <Outlet
          context={{
            sanityTekster: tekstData,
            språkContext: [språk, settSpråk],
            søker: søkerData,
            erSamtykkeBekreftetContext: [
              erSamtykkeBekreftet,
              settErSamtykkeBekreftet,
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
  språk: ELocaleType;
  dekoratørFragmenter: DecoratorElements;
}

export function Dokument({
  children,
  språk,
  dekoratørFragmenter,
}: DokumentProps) {
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
  dekoratørFragmenter: DecoratorElements;
}

export function Oppsett({ children, dekoratørFragmenter }: OppsettProps) {
  return (
    <>
      {parse(dekoratørFragmenter.DECORATOR_HEADER, { trim: true })}
      {children}
      {parse(dekoratørFragmenter.DECORATOR_FOOTER, { trim: true })}
    </>
  );
}

export function ErrorBoundary() {
  const { dekoratørFragmenter } = useLoaderData<typeof loader>();

  return <Feilside dekoratørFragmenter={dekoratørFragmenter} />;
}
