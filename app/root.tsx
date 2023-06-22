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

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: designsystemStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const sanityTekster = await hentDataFraSanity();
  const response = await hentSøker(request);
  const søker = await response.json();
  return { sanityTekster, søker };
};
export default function App() {
  const data = useLoaderData<typeof loader>();
  console.log(data.søker);

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
            sanityTekster: data.sanityTekster,
            språkContext: [språk, settSpråk],
            søker: data.søker,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
