import { cssBundleHref } from '@remix-run/css-bundle';
import designsystemStyles from '@navikt/ds-css/dist/index.css';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from '@remix-run/react';
import Spinner from './components/Spinner';
import { useEffect } from 'react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: designsystemStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  /* 
  Et alternativ, som vi ikke fikk til å funke. Kommenterer ut i tilfelle den skal bli brukt allikevel.

  const navigation = useNavigation();
  useEffect(() => {
    console.log(navigation);
  }, [navigation]);
 */
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/*  {navigation.state === 'loading' && <Spinner />} */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
