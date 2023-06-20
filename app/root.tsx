import { cssBundleHref } from '@remix-run/css-bundle';
import designsystemStyles from '@navikt/ds-css/dist/index.css';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { AppContex, LocaleType } from './typer/sanity/sanity';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react';
import { hentDataFraSanity } from './utils/sanityLoader';
import { useState } from 'react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: designsystemStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async () => {
  return await hentDataFraSanity();
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  const [spraak, settSpraak] = useState<LocaleType>(LocaleType.nb);
  console.log(spraak);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet
          context={{ sanityTekster: data, spraak: [spraak, settSpraak] }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function useSpraak() {
  const { spraak } = useOutletContext<AppContex>();
  return spraak;
}
