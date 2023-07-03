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
import { LocaleType } from './typer/sanity/sanity';
import { hentSøker } from './utils/hentFraApi';
import { useState } from 'react';
//import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import { DecoratorElements } from '@navikt/nav-dekoratoren-moduler/ssr';
import { hentDekoratorHtml } from './dekorator/dekorator.server';
import parse from 'html-react-parser';

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
  /*   const dekoratør = await fetchDecoratorHtml({
    env: 'localhost',
    localUrl: 'https://dekoratoren.ekstern.dev.nav.no/',
  })
    //.then(resultat => console.log('viktig resultat', resultat))
    .catch(resultat => console.log(resultat));
  console.log('Dekoratør backend', dekoratør && dekoratør); */
  const fragments = await hentDekoratorHtml();

  return {
    tekstData,
    søkerData,
    /*   env: {
      BASE_PATH: process.env.BASE_PATH,
      IS_LOCALHOST: process.env.IS_LOCALHOST,
    }, */

    fragments,
  };
};

export default function App() {
  const { tekstData, søkerData, fragments } = useLoaderData<typeof loader>();
  const [språk, settSpråk] = useState<LocaleType>(LocaleType.nb);

  return (
    <>
      <Document fragments={fragments}>
        <Layout fragments={fragments}>
          {/*         <div
            dangerouslySetInnerHTML={{ __html: dekoratør.DECORATOR_HEADER }}
          /> */}
          <Outlet
            context={{
              sanityTekster: tekstData,
              språkContext: [språk, settSpråk],
              søker: søkerData,
            }}
          />
          <ScrollRestoration />
          <Scripts />
          {parse(fragments.DECORATOR_SCRIPTS, { trim: true })}
          <LiveReload />
        </Layout>
      </Document>
    </>
  );
}

interface DocumentProps {
  children: React.ReactNode;
  fragments: DecoratorElements;
}

export function Document({ children, fragments }: DocumentProps) {
  /* const { fragments } = useLoaderData<typeof loader>(); */
  //Usikker på denne
  const [språk] = useState<LocaleType>(LocaleType.nb);

  return (
    <html lang={språk}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {parse(fragments.DECORATOR_STYLES, { trim: true })}
        <Links />
      </head>
      <body>
        {children}
        {/*Enable live reload in development environment only, not production */}
        {/*process.env.NODE_ENV === 'development' ? <LiveReload /> : null*/}
        {/*  <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        /> */}
      </body>
    </html>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  fragments: DecoratorElements;
}

export function Layout({ children, fragments }: LayoutProps) {
  /*   const { fragments } = useLoaderData<typeof loader>();
   */ //const Decorator = await fetchDecoratorReact(props);

  return (
    <>
      {parse(fragments.DECORATOR_HEADER, { trim: true })}
      {children}
      {parse(fragments.DECORATOR_FOOTER, { trim: true })}
    </>
  );
}

interface ErrorBoundaryProps {
  error: Error;
}

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  const { fragments } = useLoaderData<typeof loader>();

  console.log(error);
  return (
    <Document fragments={fragments}>
      <Layout fragments={fragments}>
        <h1>There was an Error</h1>
      </Layout>
    </Document>
  );
}
