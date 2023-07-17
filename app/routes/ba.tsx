import { Outlet } from '@remix-run/react';

import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';

export default function Barnetrygd() {
  return (
    <HovedInnhold>
      <Outlet />
    </HovedInnhold>
  );
}
