import { Outlet } from '@remix-run/react';

import HovedInnhold from '~/komponenter/hovedInnhold/HovedInnhold';

export default function Kontantstøtte() {
  return (
    <HovedInnhold>
      <Outlet />
    </HovedInnhold>
  );
}
